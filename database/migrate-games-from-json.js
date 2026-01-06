/**
 * Script para migrar juegos desde frontend/src/data/games.js a SQL Server
 * 
 * Uso:
 * node database/migrate-games-from-json.js
 */

require('dotenv').config({ path: '../backend/.env' });
const sql = require('mssql');
const gamesData = require('../frontend/src/data/games.js');

// Configuración de conexión
const config = {
  server: process.env.SQL_SERVER || process.env.SQLHOST || 'localhost',
  database: process.env.SQL_DATABASE || process.env.SQLDATABASE || 'RentGamer',
  user: process.env.SQL_USER || process.env.SQLUSER,
  password: process.env.SQL_PASSWORD || process.env.SQLPASSWORD,
  port: parseInt(process.env.SQL_PORT || process.env.SQLPORT || '1433'),
  options: {
    encrypt: process.env.SQL_ENCRYPT === 'true' || false,
    trustServerCertificate: process.env.SQL_TRUST_CERT === 'true' || false,
    enableArithAbort: true,
  },
};

// Mapeo de categorías (string) a IDs de base de datos
const categoryMap = {
  'Acción': 'Action',
  'Aventura': 'Adventure',
  'Estrategia': 'Strategy',
  'RPG': 'RPG',
  'Sports': 'Sports',
  'Racing': 'Racing',
};

/**
 * Obtener ID de categoría por nombre
 */
async function getCategoryId(pool, categoryName) {
  try {
    // Normalizar nombre de categoría
    const normalizedName = categoryMap[categoryName] || categoryName;
    
    const request = pool.request();
    request.input('name', sql.NVarChar, normalizedName);
    
    const result = await request.query(
      'SELECT id FROM Categories WHERE name = @name'
    );
    
    if (result.recordset.length > 0) {
      return result.recordset[0].id;
    }
    
    // Si no existe, crear la categoría
    console.log(`⚠️  Categoría "${normalizedName}" no existe. Creándola...`);
    const insertRequest = pool.request();
    insertRequest.input('name', sql.NVarChar, normalizedName);
    insertRequest.input('description', sql.NVarChar, `Categoría: ${normalizedName}`);
    
    const insertResult = await insertRequest.query(
      `INSERT INTO Categories (name, description) 
       OUTPUT INSERTED.id 
       VALUES (@name, @description)`
    );
    
    return insertResult.recordset[0].id;
  } catch (error) {
    console.error(`Error obteniendo categoría "${categoryName}":`, error.message);
    throw error;
  }
}

/**
 * Verificar si un juego ya existe
 */
async function gameExists(pool, gameName) {
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, gameName);
    
    const result = await request.query(
      'SELECT id FROM Games WHERE name = @name'
    );
    
    return result.recordset.length > 0;
  } catch (error) {
    console.error('Error verificando juego:', error.message);
    return false;
  }
}

/**
 * Insertar un juego en la base de datos
 */
async function insertGame(pool, game, categoryId) {
  try {
    const request = pool.request();
    request.input('name', sql.NVarChar, game.name);
    request.input('category_id', sql.Int, categoryId);
    request.input('price', sql.Decimal(10, 2), parseFloat(game.price));
    request.input('image', sql.NVarChar(500), game.image || null);
    request.input('description', sql.NVarChar(sql.MAX), game.description || null);
    request.input('stock', sql.Int, 10); // Stock por defecto
    
    const result = await request.query(
      `INSERT INTO Games (name, category_id, price, image, description, stock)
       OUTPUT INSERTED.id, INSERTED.name
       VALUES (@name, @category_id, @price, @image, @description, @stock)`
    );
    
    return result.recordset[0];
  } catch (error) {
    console.error(`Error insertando juego "${game.name}":`, error.message);
    throw error;
  }
}

/**
 * Función principal de migración
 */
async function migrateGames() {
  let pool;
  
  try {
    console.log('🔄 Iniciando migración de juegos...\n');
    
    // Conectar a la base de datos
    console.log('📡 Conectando a SQL Server...');
    pool = await sql.connect(config);
    console.log('✅ Conectado exitosamente\n');
    
    let inserted = 0;
    let skipped = 0;
    let errors = 0;
    
    // Procesar cada juego
    for (const game of gamesData.games) {
      try {
        // Verificar si el juego ya existe
        const exists = await gameExists(pool, game.name);
        if (exists) {
          console.log(`⏭️  Saltando "${game.name}" (ya existe)`);
          skipped++;
          continue;
        }
        
        // Obtener ID de categoría
        const categoryId = await getCategoryId(pool, game.category);
        
        // Insertar juego
        const result = await insertGame(pool, game, categoryId);
        console.log(`✅ Insertado: "${result.name}" (ID: ${result.id})`);
        inserted++;
        
      } catch (error) {
        console.error(`❌ Error procesando "${game.name}":`, error.message);
        errors++;
      }
    }
    
    console.log('\n========================================');
    console.log('📊 Resumen de migración:');
    console.log(`   ✅ Insertados: ${inserted}`);
    console.log(`   ⏭️  Saltados: ${skipped}`);
    console.log(`   ❌ Errores: ${errors}`);
    console.log(`   📦 Total procesados: ${gamesData.games.length}`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error en la migración:', error);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
      console.log('🔌 Conexión cerrada');
    }
  }
}

// Ejecutar migración
if (require.main === module) {
  migrateGames()
    .then(() => {
      console.log('✅ Migración completada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { migrateGames };


