require('dotenv').config();
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true,
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' || false,
    enableArithAbort: true,
  },
};

console.log('🔄 Intentando conectar a Azure SQL Database...\n');
console.log('📋 Configuración:');
console.log(`   Servidor: ${config.server}`);
console.log(`   Base de datos: ${config.database}`);
console.log(`   Usuario: ${config.user}`);
console.log(`   Puerto: ${config.port}`);
console.log(`   Encriptación: ${config.options.encrypt}\n`);

sql.connect(config)
  .then(pool => {
    console.log('✅ ¡CONEXIÓN EXITOSA!\n');
    
    // Ejecutar un query simple para verificar la conexión
    return pool.request()
      .query('SELECT 1 as test')
      .then(result => {
        console.log('✅ Query de prueba ejecutado correctamente');
        console.log(`   Resultado: ${JSON.stringify(result.recordset)}\n`);
        
        // Cerrar la conexión
        return pool.close();
      });
  })
  .then(() => {
    console.log('✅ Conexión cerrada correctamente');
    console.log('🎉 Configuración de Azure SQL Database verificada!\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ ERROR DE CONEXIÓN:');
    console.error(`   ${err.message}\n`);
    console.error('📌 Posibles soluciones:');
    console.error('   1. Verifica que el servidor Azure SQL esté activo');
    console.error('   2. Revisa el usuario y contraseña en el archivo .env');
    console.error('   3. Asegúrate de que tu IP está en las reglas de firewall de Azure');
    console.error('   4. Verifica que el nombre del servidor sea correcto\n');
    process.exit(1);
  });
