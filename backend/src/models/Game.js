const db = require('../config/database');

const Game = {
  /**
   * Obtener todos los juegos
   */
  getAll: async () => {
    try {
      const result = await db.queryWithParams(
        `SELECT g.*, c.name as category_name, c.description as category_description
         FROM Games g
         INNER JOIN Categories c ON g.category_id = c.id
         WHERE g.is_active = 1
         ORDER BY g.created_at DESC`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un juego por ID
   */
  getById: async (id) => {
    try {
      const result = await db.queryWithParams(
        `SELECT g.*, c.name as category_name, c.description as category_description
         FROM Games g
         INNER JOIN Categories c ON g.category_id = c.id
         WHERE g.id = @id AND g.is_active = 1`,
        { id: parseInt(id) }
      );
      return result[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear un nuevo juego
   */
  create: async (game) => {
    try {
      const { name, category_id, price, image, description, stock } = game;
      
      const result = await db.queryWithParams(
        `INSERT INTO Games (name, category_id, price, image, description, stock)
         OUTPUT INSERTED.*
         VALUES (@name, @category_id, @price, @image, @description, @stock)`,
        {
          name,
          category_id: parseInt(category_id),
          price: parseFloat(price),
          image: image || null,
          description: description || null,
          stock: stock || 1,
        }
      );
      
      return result[0];
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un juego existente
   */
  update: async (id, game) => {
    try {
      const { name, category_id, price, image, description, stock, is_active } = game;
      
      const result = await db.queryWithParams(
        `UPDATE Games 
         SET name = @name,
             category_id = @category_id,
             price = @price,
             image = @image,
             description = @description,
             stock = @stock,
             is_active = @is_active,
             updated_at = GETDATE()
         OUTPUT INSERTED.*
         WHERE id = @id`,
        {
          id: parseInt(id),
          name,
          category_id: parseInt(category_id),
          price: parseFloat(price),
          image: image || null,
          description: description || null,
          stock: stock !== undefined ? parseInt(stock) : undefined,
          is_active: is_active !== undefined ? is_active : true,
        }
      );
      
      return result[0] || null;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un juego (soft delete)
   */
  delete: async (id) => {
    try {
      const result = await db.queryWithParams(
        `UPDATE Games 
         SET is_active = 0, updated_at = GETDATE()
         OUTPUT INSERTED.*
         WHERE id = @id`,
        { id: parseInt(id) }
      );
      
      return { affectedRows: result.length };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener juegos por categoría
   */
  getByCategory: async (categoryId) => {
    try {
      const result = await db.queryWithParams(
        `SELECT g.*, c.name as category_name
         FROM Games g
         INNER JOIN Categories c ON g.category_id = c.id
         WHERE g.category_id = @categoryId AND g.is_active = 1
         ORDER BY g.name`,
        { categoryId: parseInt(categoryId) }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Buscar juegos por nombre
   */
  search: async (searchTerm) => {
    try {
      const result = await db.queryWithParams(
        `SELECT g.*, c.name as category_name
         FROM Games g
         INNER JOIN Categories c ON g.category_id = c.id
         WHERE g.name LIKE @searchTerm AND g.is_active = 1
         ORDER BY g.name`,
        { searchTerm: `%${searchTerm}%` }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Game;
