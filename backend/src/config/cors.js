/**
 * Configuración de CORS
 * Centraliza la configuración de CORS para facilitar el mantenimiento
 */

// Lista de orígenes permitidos en producción
const allowedOrigins = [
  'https://gentle-beach-02b34a00f.6.azurestaticapps.net',
  'https://brave-mushroom-0da565e0f.6.azurestaticapps.net',
  'https://rentgamer.netlify.app',
  process.env.FRONTEND_URL, // Variable de entorno configurable
].filter(Boolean); // Elimina valores undefined/null

const corsConfig = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, curl, etc.)
    if (!origin) {
      console.log('[CORS] Request sin origin header - PERMITIDO');
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('[CORS] Origin PERMITIDO:', origin);
      callback(null, true);
    } else {
      console.log('[CORS] Origin BLOQUEADO:', origin);
      console.log('[CORS] Orígenes permitidos:', allowedOrigins);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Para desarrollo local, permitir localhost
if (process.env.NODE_ENV === 'development') {
  corsConfig.origin = [
    'http://localhost:3000',
    'http://localhost:3001',
    ...allowedOrigins,
  ];
  console.log('[CORS] Modo desarrollo - Orígenes:', corsConfig.origin);
}

console.log('[CORS] Configuración cargada. NODE_ENV:', process.env.NODE_ENV);
console.log('[CORS] FRONTEND_URL:', process.env.FRONTEND_URL);

module.exports = corsConfig;


