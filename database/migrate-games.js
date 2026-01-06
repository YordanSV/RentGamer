/**
 * Script para migrar juegos desde frontend/src/data/games.js a SQL Server
 * 
 * Uso:
 * node database/migrate-games.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../backend/.env') });
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

// Leer el archivo games.js y extraer el array
const gamesFilePath = path.join(__dirname, '../frontend/src/data/games.js');
const gamesFileContent = fs.readFileSync(gamesFilePath, 'utf8');

// Extraer el array de juegos usando regex (simple pero funcional)
const gamesMatch = gamesFileContent.match(/export const games = \[([\s\S]*?)\];/);
if (!gamesMatch) {
  console.error('❌ No se pudo encontrar el array de juegos en el archivo');
  process.exit(1);
}

// Parsear manualmente los juegos (versión simplificada)
const games = [];
const gameMatches = gamesFileContent.matchAll(/\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*price:\s*(\d+),\s*image:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*\}/g);

for (const match of gameMatches) {
  games.push({
    id: parseInt(match[1]),
    name: match[2],
    category: match[3],
    price: parseInt(match[4]),
    image: match[5],
    description: match[6]
  });
}

// Si no se encontraron juegos con regex, intentar eval (solo en desarrollo)
if (games.length === 0) {
  console.log('⚠️  No se pudieron parsear juegos con regex. Intentando método alternativo...');
  // Método alternativo: evaluar el código (solo para desarrollo)
  try {
    const gamesModule = {};
    eval(gamesFileContent.replace('export const', 'gamesModule.games ='));
    if (gamesModule.games) {
      games.push(...gamesModule.games);
    }
  } catch (error) {
    console.error('❌ Error parseando juegos:', error.message);
    process.exit(1);
  }
}

// Configuración de conexión
const config = {
  server: process.env.DB_SERVER || process.env.DATABASE_SERVER || 'localhost',
  database: process.env.DB_NAME || process.env.DATABASE_NAME || 'RentGamer',
  user: process.env.DB_USER || process.env.DATABASE_USER,
  password: process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DB_PORT || process.env.DATABASE_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || false,
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' || false,
    enableArithAbort: true,
  },
};

// Mapeo de categorías
const categoryMap = {
  'Acción': 'Action',
  'Aventura': 'Adventure',
  'Estrategia': 'Strategy',
  'RPG': 'RPG',
  'Sports': 'Sports',
  'Racing': 'Racing',
};

async function getCategoryId(pool, categoryName) {
  try {
    const normalizedName = categoryMap[categoryName] || categoryName;
    const request = pool.request();
    request.input('name', sql.NVarChar, normalizedName);
    
    const result = await request.query('SELECT id FROM Categories WHERE name = @name');
    
    if (result.recordset.length > 0) {
      return result.recordset[0].id;
    }
    
    console.log(`⚠️  Creando categoría "${normalizedName}"...`);
    const insertRequest = pool.request();
    insertRequest.input('name', sql.NVarChar, normalizedName);
    insertRequest.input('description', sql.NVarChar, `Categoría: ${normalizedName}`);
    
    const insertResult = await insertRequest.query(
      `INSERT INTO Categories (name, description) OUTPUT INSERTED.id VALUES (@name, @description)`
    );
    
    return insertResult.recordset[0].id;
  } catch (error) {
    console.error(`Error con categoría "${categoryName}":`, error.message);
    throw error;
  }
}

async function gameExists(pool, gameName) {
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, gameName);
    const result = await request.query('SELECT id FROM Games WHERE name = @name');
    return result.recordset.length > 0;
  } catch (error) {
    return false;
  }
}

async function insertGame(pool, game, categoryId) {
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, game.name);
    request.input('category_id', sql.Int, categoryId);
    request.input('price', sql.Decimal(10, 2), parseFloat(game.price));
    request.input('image', sql.NVarChar(500), game.image || null);
    request.input('description', sql.NVarChar(sql.MAX), game.description || null);
    request.input('stock', sql.Int, 10);
    
    const result = await request.query(
      `INSERT INTO Games (name, category_id, price, image, description, stock)
       OUTPUT INSERTED.id, INSERTED.name
       VALUES (@name, @category_id, @price, @image, @description, @stock)`
    );
    
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

async function migrateGames() {
  let pool;
  
  try {
    console.log('🔄 Iniciando migración de juegos...\n');
    console.log(`📦 Juegos encontrados: ${games.length}\n`);
    
    if (games.length === 0) {
      console.error('❌ No se encontraron juegos para migrar');
      process.exit(1);
    }
    
    console.log('📡 Conectando a SQL Server...');
    pool = await sql.connect(config);
    console.log('✅ Conectado exitosamente\n');
    
    let inserted = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const game of games) {
      try {
        if (await gameExists(pool, game.name)) {
          console.log(`⏭️  Saltando "${game.name}" (ya existe)`);
          skipped++;
          continue;
        }
        
        const categoryId = await getCategoryId(pool, game.category);
        const result = await insertGame(pool, game, categoryId);
        console.log(`✅ Insertado: "${result.name}" (ID: ${result.id})`);
        inserted++;
        
      } catch (error) {
        console.error(`❌ Error con "${game.name}":`, error.message);
        errors++;
      }
    }
    
    console.log('\n========================================');
    console.log('📊 Resumen:');
    console.log(`   ✅ Insertados: ${inserted}`);
    console.log(`   ⏭️  Saltados: ${skipped}`);
    console.log(`   ❌ Errores: ${errors}`);
    console.log(`   📦 Total: ${games.length}`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
      console.log('🔌 Conexión cerrada');
    }
  }
}

migrateGames()
  .then(() => {
    console.log('✅ Migración completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });

