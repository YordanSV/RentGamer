const db = require('../server'); // Importar conexión a la base de datos

const Game = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM games', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM games WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },
  create: (game) => {
    return new Promise((resolve, reject) => {
      const { name, category, price, image, description } = game;
      db.query(
        'INSERT INTO games (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)',
        [name, category, price, image, description],
        (err, result) => {
          if (err) reject(err);
          else resolve({ id: result.insertId, ...game });
        }
      );
    });
  },
  update: (id, game) => {
    return new Promise((resolve, reject) => {
      const { name, category, price, image, description } = game;
      db.query(
        'UPDATE games SET name = ?, category = ?, price = ?, image = ?, description = ? WHERE id = ?',
        [name, category, price, image, description, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM games WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = Game;
