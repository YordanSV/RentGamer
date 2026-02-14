/**
 * Script para actualizar las URLs de imágenes a Azure Blob Storage
 * Convierte rutas locales /img-games/... a URLs completas de Azure
 */

require('dotenv').config();
const sql = require('mssql');

const BLOB_STORAGE_URL = 'https://rentgamerstorage.blob.core.windows.net';

// Configuración de la conexión
const config = {
  server: process.env.DB_SERVER || 'rentgamer-sql.database.windows.net',
  database: process.env.DB_NAME || 'RentGamerDB',
  user: process.env.DB_USER || 'yordan@rentgamer-sql',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true,
  },
};

async function updateImageUrls() {
  let pool;
  
  try {
    console.log('🔗 Conectando a la base de datos...');
    pool = await sql.connect(config);
    console.log('✅ Conexión exitosa\n');

    // 1. Mostrar URLs actuales
    console.log('📋 URLs actuales:');
    const currentResult = await pool.request().query(`
      SELECT id, name, image
      FROM Games
      WHERE image LIKE '/img-games/%'
      ORDER BY id
    `);
    
    console.log(`Juegos con URLs locales: ${currentResult.recordset.length}`);
    currentResult.recordset.slice(0, 5).forEach(game => {
      console.log(`  - ${game.name}: ${game.image}`);
    });
    if (currentResult.recordset.length > 5) {
      console.log(`  ... y ${currentResult.recordset.length - 5} más\n`);
    }

    // 2. Actualizar URLs
    console.log('\n🔄 Actualizando URLs a Azure Blob Storage...');
    const updateResult = await pool.request().query(`
      UPDATE Games
      SET image = REPLACE(image, '/img-games/', '${BLOB_STORAGE_URL}/img-games/')
      WHERE image LIKE '/img-games/%'
    `);

    console.log(`✅ ${updateResult.rowsAffected[0]} juegos actualizados\n`);

    // 3. Verificar URLs actualizadas
    console.log('📋 URLs actualizadas:');
    const updatedResult = await pool.request().query(`
      SELECT id, name, image
      FROM Games
      WHERE image LIKE 'https://%'
      ORDER BY id
    `);

    updatedResult.recordset.slice(0, 5).forEach(game => {
      console.log(`  - ${game.name}: ${game.image}`);
    });
    if (updatedResult.recordset.length > 5) {
      console.log(`  ... y ${updatedResult.recordset.length - 5} más\n`);
    }

    // 4. Resumen
    const summaryResult = await pool.request().query(`
      SELECT 
        COUNT(*) as total_games,
        SUM(CASE WHEN image LIKE 'https://%' THEN 1 ELSE 0 END) as with_azure_urls,
        SUM(CASE WHEN image LIKE '/img-games/%' THEN 1 ELSE 0 END) as with_local_urls
      FROM Games
    `);

    const summary = summaryResult.recordset[0];
    console.log('📊 Resumen:');
    console.log(`  Total de juegos: ${summary.total_games}`);
    console.log(`  Con URLs de Azure: ${summary.with_azure_urls}`);
    console.log(`  Con URLs locales: ${summary.with_local_urls}`);

    console.log('\n✅ Migración completada exitosamente');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Ejecutar script
updateImageUrls();
