-- =============================================
-- Datos de Prueba (Seed Data)
-- =============================================

USE RentGamer;
GO

-- Limpiar datos existentes (opcional, solo para desarrollo)
-- DELETE FROM Reviews;
-- DELETE FROM CartItems;
-- DELETE FROM Rentals;
-- DELETE FROM Subscriptions;
-- DELETE FROM Games;
-- DELETE FROM Categories;
-- DELETE FROM Users;
-- GO

-- =============================================
-- Insertar Categorías
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Categories WHERE name = 'Action')
BEGIN
    INSERT INTO Categories (name, description) VALUES
    ('Action', 'Juegos de acción y aventura'),
    ('Adventure', 'Juegos de aventura y exploración'),
    ('Strategy', 'Juegos de estrategia y táctica'),
    ('RPG', 'Juegos de rol'),
    ('Sports', 'Juegos deportivos'),
    ('Racing', 'Juegos de carreras');
    PRINT 'Categorías insertadas';
END
GO

-- =============================================
-- Insertar Usuarios de Prueba
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Users WHERE email = 'admin@rentgamer.com')
BEGIN
    INSERT INTO Users (email, password, first_name, last_name, phone) VALUES
    ('admin@rentgamer.com', '$2b$10$hashedpassword', 'Admin', 'User', '1234567890'),
    ('john.doe@example.com', '$2b$10$hashedpassword', 'John', 'Doe', '0987654321'),
    ('jane.smith@example.com', '$2b$10$hashedpassword', 'Jane', 'Smith', '1122334455');
    PRINT 'Usuarios de prueba insertados';
END
GO

-- =============================================
-- Insertar Juegos de Prueba
-- =============================================
DECLARE @ActionId INT, @AdventureId INT, @StrategyId INT;

SELECT @ActionId = id FROM Categories WHERE name = 'Action';
SELECT @AdventureId = id FROM Categories WHERE name = 'Adventure';
SELECT @StrategyId = id FROM Categories WHERE name = 'Strategy';

IF NOT EXISTS (SELECT 1 FROM Games WHERE name = 'Call of Duty: Modern Warfare')
BEGIN
    INSERT INTO Games (name, category_id, price, image, description, stock) VALUES
    ('Call of Duty: Modern Warfare', @ActionId, 5.99, '/imgGames/action1.png', 'Juego de acción en primera persona', 10),
    ('Assassin''s Creed Valhalla', @AdventureId, 6.99, '/imgGames/adventure1.jpg', 'Aventura épica en la era vikinga', 8),
    ('Civilization VI', @StrategyId, 4.99, '/imgGames/strategy1.png', 'Estrategia por turnos', 5),
    ('The Last of Us Part II', @ActionId, 7.99, '/imgGames/action2.png', 'Aventura de supervivencia', 12),
    ('Horizon Zero Dawn', @AdventureId, 6.49, '/imgGames/adventure2.jpg', 'Mundo abierto post-apocalíptico', 9),
    ('Age of Empires IV', @StrategyId, 5.49, '/imgGames/strategy2.png', 'Estrategia en tiempo real', 7);
    PRINT 'Juegos de prueba insertados';
END
GO

-- =============================================
-- Insertar Suscripciones de Prueba
-- =============================================
DECLARE @UserId INT;
SELECT @UserId = id FROM Users WHERE email = 'john.doe@example.com';

IF NOT EXISTS (SELECT 1 FROM Subscriptions WHERE user_id = @UserId)
BEGIN
    INSERT INTO Subscriptions (user_id, plan_type, start_date, end_date, status) VALUES
    (@UserId, 'premium', GETDATE(), DATEADD(MONTH, 1, GETDATE()), 'active');
    PRINT 'Suscripciones de prueba insertadas';
END
GO

PRINT '=============================================';
PRINT 'Datos de prueba insertados exitosamente';
PRINT '=============================================';


