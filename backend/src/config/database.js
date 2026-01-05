require('dotenv').config();

const sql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
  server: process.env.DB_SERVER || process.env.DATABASE_SERVER || 'localhost',
  database: process.env.DB_NAME || process.env.DATABASE_NAME || 'RentGamer',
  user: process.env.DB_USER || process.env.DATABASE_USER,
  password: process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DB_PORT || process.env.DATABASE_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true' || true, // Azure SQL requiere encrypt: true
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' || false,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Crear pool de conexiones
let pool = null;

/**
 * Obtener pool de conexiones
 * Crea el pool si no existe
 */
const getPool = async () => {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(config);
    console.log('✅ Conexión a SQL Server exitosa');
    return pool;
  } catch (error) {
    console.error('❌ Error conectando a SQL Server:', error.message);
    throw error;
  }
};

/**
 * Ejecutar query
 * @param {string} query - Query SQL
 * @param {Array} params - Parámetros (opcional)
 * @returns {Promise} Resultado de la query
 */
const query = async (queryText, params = []) => {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Agregar parámetros si existen
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });

    // Reemplazar ? con @param0, @param1, etc. para SQL Server
    let sqlQuery = queryText;
    params.forEach((_, index) => {
      sqlQuery = sqlQuery.replace('?', `@param${index}`);
    });

    const result = await request.query(sqlQuery);
    return result.recordset || result;
  } catch (error) {
    console.error('Error ejecutando query:', error);
    throw error;
  }
};

/**
 * Ejecutar query con parámetros nombrados (método recomendado)
 * @param {string} queryText - Query SQL con parámetros nombrados (@paramName)
 * @param {Object} params - Objeto con parámetros
 * @returns {Promise} Resultado de la query
 */
const queryWithParams = async (queryText, params = {}) => {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Agregar parámetros nombrados
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(queryText);
    return result.recordset || result;
  } catch (error) {
    console.error('Error ejecutando query:', error);
    throw error;
  }
};

/**
 * Cerrar conexión
 */
const close = async () => {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Conexión cerrada');
    }
  } catch (error) {
    console.error('Error cerrando conexión:', error);
  }
};

// Verificar conexión al iniciar
(async () => {
  try {
    await getPool();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos al iniciar:', error.message);
  }
})();

module.exports = {
  getPool,
  query,
  queryWithParams,
  close,
  sql, // Exportar sql para uso avanzado
};
