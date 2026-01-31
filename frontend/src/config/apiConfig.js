/**
 * Configuración centralizada de API
 * Define diferentes configuraciones según el entorno (desarrollo, producción, etc.)
 */

// Detectar ambiente
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Configuración por ambiente
const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    blobStorageUrl: process.env.REACT_APP_BLOB_STORAGE_URL || 'http://localhost:3000',
    timeout: 15000,
    debug: true,
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://rentgamer-api-d5hzc6gahsc7ecaj.eastus2-01.azurewebsites.net',
    blobStorageUrl: process.env.REACT_APP_BLOB_STORAGE_URL || 'https://rentgamerstorage.blob.core.windows.net',
    timeout: 15000,
    debug: false,
  },
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
 * @param {string} imagePath - Ruta relativa de la imagen (ej: "action1.png")
 * @param {string} container - Contenedor en Blob Storage (ej: "imgGames")
 * @returns {string} URL completa de la imagen
 */
export const getImageUrl = (imagePath, container = 'imgGames') => {
  // Si el path ya es una URL completa, devolverla tal cual
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Si es una ruta local (comienza con /), devolver relativa
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Si estamos en producción y tenemos Blob Storage, construir URL del storage
  if (isProduction || process.env.REACT_APP_BLOB_STORAGE_URL) {
    return `${currentConfig.blobStorageUrl}/${container}/${imagePath}`;
  }

  // En desarrollo, usar ruta relativa local
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
