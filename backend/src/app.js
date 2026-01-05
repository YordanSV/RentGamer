/**
 * Configuración principal de Express
 * Contiene toda la configuración de middleware y rutas
 */

const express = require('express');
const cors = require('cors');
const corsConfig = require('./config/cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Middleware globales
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de peticiones
app.use(logger);

// Rutas
app.use('/api/games', gameRoutes);

// Ruta de salud (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;


