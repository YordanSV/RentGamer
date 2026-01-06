/**
 * Validadores para las operaciones de juegos
 * Valida los datos de entrada antes de procesarlos
 */

const validateGame = (req, res, next) => {
  const { name, category_id, price, image, description, stock } = req.body;

  const errors = [];

  // Validar nombre
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('El nombre del juego es requerido y debe ser una cadena de texto');
  }

  if (name && name.length > 255) {
    errors.push('El nombre del juego no puede exceder 255 caracteres');
  }

  // Validar category_id (ahora es un ID numérico)
  if (category_id === undefined || category_id === null) {
    errors.push('La categoría (category_id) es requerida');
  } else if (typeof category_id !== 'number' || category_id <= 0) {
    errors.push('La categoría debe ser un ID numérico válido');
  }

  // Validar precio
  if (price === undefined || price === null) {
    errors.push('El precio es requerido');
  } else if (typeof price !== 'number' || price < 0) {
    errors.push('El precio debe ser un número positivo');
  }

  // Validar stock (opcional)
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    errors.push('El stock debe ser un número positivo o cero');
  }

  // Validar imagen (opcional pero si existe debe ser string)
  if (image !== undefined && (typeof image !== 'string' || image.trim().length === 0)) {
    errors.push('La URL de la imagen debe ser una cadena de texto válida');
  }

  // Validar descripción (opcional)
  if (description !== undefined && typeof description !== 'string') {
    errors.push('La descripción debe ser una cadena de texto');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors,
    });
  }

  next();
};

const validateGameId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'ID de juego inválido',
      error: 'El ID debe ser un número válido',
    });
  }

  next();
};

module.exports = {
  validateGame,
  validateGameId,
};

