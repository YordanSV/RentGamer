/**
 * Configuración centralizada de API
 * Define diferentes configuraciones según el entorno (desarrollo, producción, etc.)
 * 
 * 🚀 INSTRUCCIONES PARA DESPLIEGUE EN PRODUCCIÓN:
 * ================================================
 * 1. Ejecuta: npm run build
 * 2. El build automáticamente usará NODE_ENV=production
 * 3. La aplicación usará las URLs de Azure configuradas abajo
 * 4. Las imágenes se cargarán desde Azure Blob Storage
 * 
 * 💻 PARA DESARROLLO LOCAL:
 * ========================
 * 1. Ejecuta: npm start
 * 2. Se usará NODE_ENV=development automáticamente
 * 3. API: http://localhost:8080
 * 4. Imágenes: carpeta local /public/img-games/
 */

// Detectar ambiente
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuración por ambiente
const config = {
  // 🏠 DESARROLLO LOCAL
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    blobStorageUrl: '', // Vacío = usa imágenes locales de /public/img-games/
    timeout: 15000,
    debug: true,
  },
  
  // ☁️ PRODUCCIÓN EN AZURE
  production: {
    // Backend desplegado en Azure App Service
    apiUrl: process.env.REACT_APP_API_URL || 'https://rentgamer-api-d5hzc6gahsc7ecaj.eastus2-01.azurewebsites.net',
    // Imágenes en Azure Blob Storage
    blobStorageUrl: process.env.REACT_APP_BLOB_STORAGE_URL || 'https://rentgamerstorage.blob.core.windows.net',
    timeout: 15000,
    debug: false,
  },
  
  // 🧪 STAGING (OPCIONAL)
  staging: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://staging-backend-azure.azurewebsites.net',
    blobStorageUrl: process.env.REACT_APP_BLOB_STORAGE_URL || 'https://rentgamerstorage.blob.core.windows.net',
    timeout: 15000,
    debug: true,
  },
};

// Obtener configuración actual
const currentEnv = process.env.NODE_ENV || 'development';
const currentConfig = config[currentEnv] || config.development;

console.log('[API Config] Ambiente:', currentEnv);
console.log('[API Config] API URL:', currentConfig.apiUrl);
console.log('[API Config] Blob Storage URL:', currentConfig.blobStorageUrl);

export default currentConfig;

/**
 * Función auxiliar para construir URLs de imágenes
 * 
 * 🖼️ FUNCIONAMIENTO:
 * =================
 * - DESARROLLO: Usa imágenes de /public/img-games/ (ej: /img-games/action1.png)
 * - PRODUCCIÓN: Usa Azure Blob Storage (ej: https://rentgamerstorage.blob.core.windows.net/img-games/action1.png)
 * 
 * @param {string} imagePath - Ruta relativa de la imagen (ej: "action1.png")
 * @param {string} container - Contenedor en Blob Storage (ej: "img-games")
 * @returns {string} URL completa de la imagen
 */
export const getImageUrl = (imagePath, container = 'img-games') => {
  // Si el path ya es una URL completa, devolverla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Si es una ruta local (comienza con /), devolver tal cual
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // 🏠 DESARROLLO: usar rutas locales del public folder
  if (isDevelopment) {
    return `/${container}/${imagePath}`;
  }

  // ☁️ PRODUCCIÓN: usar Azure Blob Storage
  if (currentConfig.blobStorageUrl) {
    return `${currentConfig.blobStorageUrl}/${container}/${imagePath}`;
  }

  // Fallback: usar ruta relativa local
  return `/${container}/${imagePath}`;
};

/**
 * Función auxiliar para construir URLs de API
 * @param {string} endpoint - Endpoint relativo (ej: "/api/games")
 * @returns {string} URL completa del endpoint
 */
export const getApiUrl = (endpoint) => {
  const baseUrl = currentConfig.apiUrl;
  return endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
};

export { currentConfig as apiConfig };
