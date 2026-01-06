const db = require('../config/database');

const Category = {
  /**
   * Obtener todas las categorías
   */
  getAll: async () => {
    try {
      const result = await db.queryWithParams(
        'SELECT * FROM Categories ORDER BY name'
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una categoría por ID
   */
  getById: async (id) => {
    try {
      const result = await db.queryWithParams(
        'SELECT * FROM Categories WHERE id = @id',
        { id: parseInt(id) }
      );
      return result[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva categoría
   */
  create: async (category) => {
    try {
      const { name, description } = category;
      
      const result = await db.queryWithParams(
        `INSERT INTO Categories (name, description)
         OUTPUT INSERTED.*
         VALUES (@name, @description)`,
        {
          name,
          description: description || null,
        }
      );
      
      return result[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una categoría
   */
  update: async (id, category) => {
    try {
      const { name, description } = category;
      
      const result = await db.queryWithParams(
        `UPDATE Categories 
         SET name = @name, description = @description
         OUTPUT INSERTED.*
         WHERE id = @id`,
        {
          id: parseInt(id),
          name,
          description: description || null,
        }
      );
      
      return result[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una categoría
   */
  delete: async (id) => {
    try {
      const result = await db.queryWithParams(
        'DELETE FROM Categories OUTPUT DELETED.* WHERE id = @id',
        { id: parseInt(id) }
      );
      
      return { affectedRows: result.length };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Category;


