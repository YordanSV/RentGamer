require('dotenv').config();

const mysql = require('mysql2');

// Configuración de la conexión
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('Conexión exitosa:', rows[0].solution);
  } catch (error) {
    console.log(process.env.MYSQLPASSWORD)
    console.error('Error conectando a la base de datos:', error.message);
  }
})();

module.exports = pool;


