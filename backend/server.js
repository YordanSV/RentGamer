const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint para registrar un usuario
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({ id: result.insertId, name, email, password });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para alquilar un juego
app.post('/api/rentals', async (req, res) => {
  const { user_id, game_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO rentals (user_id, game_id, rental_date) VALUES (?, ?, NOW())',
      [user_id, game_id]
    );
    res.status(201).json({ id: result.insertId, user_id, game_id, rental_date: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para suscribirse a un plan
app.post('/api/subscriptions', async (req, res) => {
  const { user_id, plan_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO user_subscriptions (user_id, plan_id, start_date) VALUES (?, ?, NOW())',
      [user_id, plan_id]
    );
    res.status(201).json({ id: result.insertId, user_id, plan_id, start_date: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
