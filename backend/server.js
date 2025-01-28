require('dotenv').config(); // Cargar variables de entorno desde .env si estás en desarrollo
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

// app.use(cors({
//   origin: 'https://rentgamer.netlify.app', // Permitir solo un origen específico
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
// }));

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || '127.0.0.1', 
  user: process.env.MYSQLUSER, 
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db;