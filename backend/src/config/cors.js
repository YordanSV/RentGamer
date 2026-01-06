/**
 * Configuración de CORS
 * Centraliza la configuración de CORS para facilitar el mantenimiento
 */

const corsConfig = {
  origin: process.env.FRONTEND_URL || 'https://rentgamer.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Para desarrollo local, permitir localhost
if (process.env.NODE_ENV === 'development') {
  corsConfig.origin = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://rentgamer.netlify.app',
  ];
}

module.exports = corsConfig;


