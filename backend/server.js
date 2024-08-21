require('dotenv').config(); // Cargar variables de entorno desde .env si estás en desarrollo
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;

// Configurar CORS para tu frontend
app.use(cors({
  origin: 'https://rentgamer.netlify.app', // Cambia según dónde esté tu frontend
}));

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || '127.0.0.1', 
  user: process.env.MYSQLUSER, 
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

app.get('/select', (req, res) => {
  const query = 'SELECT name FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
