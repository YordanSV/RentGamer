/**
 * Funciones de formateo de datos
 * Utilidades para formatear números, fechas, texto, etc.
 */

/**
 * Formatea un precio a formato de moneda
 * @param {number} price - Precio a formatear
 * @param {string} currency - Código de moneda (default: 'USD')
 * @returns {string} Precio formateado
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Formatea texto a título (primera letra mayúscula)
 * @param {string} text - Texto a formatear
 * @returns {string} Texto formateado
 */
export const formatTitle = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Trunca un texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default {
  formatPrice,
  formatTitle,
  truncateText,
};


