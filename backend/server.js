
require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importar cors
const app = express();
const dbUrl = new URL(process.env.DATABASE_URL);

const port = process.env.PORT || 3001;

// Configurar CORS
app.use(cors({
  origin: 'https://rentgamer.netlify.app', // Reemplaza con la URL de tu frontend
  // origin: 'http://localhost:3000',
}));


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

function ejecutar() {
  console.log(dbUrl, dbUrl.hostname, dbUrl.username, dbUrl.password, process.env.DB_PORT, dbUrl.pathname.slice(1))  
}
ejecutar()

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

// Ruta para realizar una consulta SELECT
app.get('/select', (req, res) => {
  console.log('Pasoo')
  const query = 'SELECT name FROM users'; // Reemplaza 'tu_tabla' por el nombre de tu tabla

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results); // Devolver los resultados como JSON
  });
});

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
