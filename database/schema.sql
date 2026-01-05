-- =============================================
-- Script de creación de Base de Datos RentGamer
-- SQL Server / Azure SQL Database
-- =============================================

-- Crear base de datos (si no existe)
-- CREATE DATABASE RentGamer;
-- GO

-- USE RentGamer;
-- GO

-- =============================================
-- Tabla: Categories
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Categories]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [name] NVARCHAR(100) NOT NULL UNIQUE,
        [description] NVARCHAR(500) NULL,
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL
    );

    CREATE INDEX IX_Categories_Name ON [dbo].[Categories]([name]);
    PRINT 'Tabla Categories creada exitosamente';
END
GO

-- =============================================
-- Tabla: Users
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Users] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [email] NVARCHAR(255) NOT NULL UNIQUE,
        [password] NVARCHAR(255) NOT NULL,
        [first_name] NVARCHAR(100) NOT NULL,
        [last_name] NVARCHAR(100) NOT NULL,
        [phone] NVARCHAR(20) NULL,
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [is_active] BIT DEFAULT 1 NOT NULL
    );

    CREATE UNIQUE INDEX IX_Users_Email ON [dbo].[Users]([email]);
    PRINT 'Tabla Users creada exitosamente';
END
GO

-- =============================================
-- Tabla: Games
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Games]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Games] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [name] NVARCHAR(255) NOT NULL,
        [category_id] INT NOT NULL,
        [price] DECIMAL(10,2) NOT NULL CHECK ([price] > 0),
        [image] NVARCHAR(500) NULL,
        [description] NVARCHAR(MAX) NULL,
        [stock] INT DEFAULT 1 NOT NULL CHECK ([stock] >= 0),
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [is_active] BIT DEFAULT 1 NOT NULL,
        CONSTRAINT FK_Games_Categories FOREIGN KEY ([category_id]) 
            REFERENCES [dbo].[Categories]([id]) ON DELETE NO ACTION ON UPDATE CASCADE
    );

    CREATE INDEX IX_Games_CategoryId ON [dbo].[Games]([category_id]);
    CREATE INDEX IX_Games_Name ON [dbo].[Games]([name]);
    PRINT 'Tabla Games creada exitosamente';
END
GO

-- =============================================
-- Tabla: Subscriptions
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Subscriptions]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Subscriptions] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [user_id] INT NOT NULL,
        [plan_type] NVARCHAR(50) NOT NULL,
        [start_date] DATETIME2 NOT NULL,
        [end_date] DATETIME2 NULL,
        [status] NVARCHAR(20) DEFAULT 'active' NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        CONSTRAINT FK_Subscriptions_Users FOREIGN KEY ([user_id]) 
            REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE INDEX IX_Subscriptions_UserId ON [dbo].[Subscriptions]([user_id]);
    CREATE INDEX IX_Subscriptions_Status ON [dbo].[Subscriptions]([status]);
    PRINT 'Tabla Subscriptions creada exitosamente';
END
GO

-- =============================================
-- Tabla: Rentals
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Rentals]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Rentals] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [user_id] INT NOT NULL,
        [game_id] INT NOT NULL,
        [start_date] DATETIME2 NOT NULL,
        [end_date] DATETIME2 NOT NULL,
        [returned_date] DATETIME2 NULL,
        [total_price] DECIMAL(10,2) NOT NULL,
        [status] NVARCHAR(20) DEFAULT 'pending' NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        CONSTRAINT FK_Rentals_Users FOREIGN KEY ([user_id]) 
            REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
        CONSTRAINT FK_Rentals_Games FOREIGN KEY ([game_id]) 
            REFERENCES [dbo].[Games]([id]) ON DELETE NO ACTION ON UPDATE CASCADE,
        CONSTRAINT CK_Rentals_EndDate CHECK ([end_date] > [start_date]),
        CONSTRAINT CK_Rentals_ReturnedDate CHECK ([returned_date] IS NULL OR [returned_date] >= [start_date])
    );

    CREATE INDEX IX_Rentals_UserId ON [dbo].[Rentals]([user_id]);
    CREATE INDEX IX_Rentals_GameId ON [dbo].[Rentals]([game_id]);
    CREATE INDEX IX_Rentals_Status ON [dbo].[Rentals]([status]);
    PRINT 'Tabla Rentals creada exitosamente';
END
GO

-- =============================================
-- Tabla: CartItems
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CartItems]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[CartItems] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [user_id] INT NOT NULL,
        [game_id] INT NOT NULL,
        [quantity] INT DEFAULT 1 NOT NULL CHECK ([quantity] > 0),
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        CONSTRAINT FK_CartItems_Users FOREIGN KEY ([user_id]) 
            REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_CartItems_Games FOREIGN KEY ([game_id]) 
            REFERENCES [dbo].[Games]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT UQ_CartItems_UserGame UNIQUE ([user_id], [game_id])
    );

    CREATE INDEX IX_CartItems_UserId ON [dbo].[CartItems]([user_id]);
    CREATE INDEX IX_CartItems_GameId ON [dbo].[CartItems]([game_id]);
    PRINT 'Tabla CartItems creada exitosamente';
END
GO

-- =============================================
-- Tabla: Reviews
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Reviews]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Reviews] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [rental_id] INT NULL,
        [game_id] INT NOT NULL,
        [user_id] INT NOT NULL,
        [rating] INT NOT NULL CHECK ([rating] >= 1 AND [rating] <= 5),
        [comment] NVARCHAR(MAX) NULL,
        [created_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        [updated_at] DATETIME2 DEFAULT GETDATE() NOT NULL,
        CONSTRAINT FK_Reviews_Rentals FOREIGN KEY ([rental_id]) 
            REFERENCES [dbo].[Rentals]([id]) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT FK_Reviews_Games FOREIGN KEY ([game_id]) 
            REFERENCES [dbo].[Games]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_Reviews_Users FOREIGN KEY ([user_id]) 
            REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT UQ_Reviews_UserGame UNIQUE ([user_id], [game_id])
    );

    CREATE INDEX IX_Reviews_GameId ON [dbo].[Reviews]([game_id]);
    CREATE INDEX IX_Reviews_UserId ON [dbo].[Reviews]([user_id]);
    CREATE INDEX IX_Reviews_RentalId ON [dbo].[Reviews]([rental_id]);
    PRINT 'Tabla Reviews creada exitosamente';
END
GO

-- =============================================
-- Trigger para actualizar updated_at automáticamente
-- =============================================

-- Trigger para Users
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_Users_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_Users_UpdateTimestamp
    ON [dbo].[Users]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[Users]
        SET [updated_at] = GETDATE()
        FROM [dbo].[Users] u
        INNER JOIN inserted i ON u.id = i.id;
    END
    ');
    PRINT 'Trigger TR_Users_UpdateTimestamp creado';
END
GO

-- Trigger para Games
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_Games_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_Games_UpdateTimestamp
    ON [dbo].[Games]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[Games]
        SET [updated_at] = GETDATE()
        FROM [dbo].[Games] g
        INNER JOIN inserted i ON g.id = i.id;
    END
    ');
    PRINT 'Trigger TR_Games_UpdateTimestamp creado';
END
GO

-- Trigger para Subscriptions
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_Subscriptions_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_Subscriptions_UpdateTimestamp
    ON [dbo].[Subscriptions]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[Subscriptions]
        SET [updated_at] = GETDATE()
        FROM [dbo].[Subscriptions] s
        INNER JOIN inserted i ON s.id = i.id;
    END
    ');
    PRINT 'Trigger TR_Subscriptions_UpdateTimestamp creado';
END
GO

-- Trigger para Rentals
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_Rentals_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_Rentals_UpdateTimestamp
    ON [dbo].[Rentals]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[Rentals]
        SET [updated_at] = GETDATE()
        FROM [dbo].[Rentals] r
        INNER JOIN inserted i ON r.id = i.id;
    END
    ');
    PRINT 'Trigger TR_Rentals_UpdateTimestamp creado';
END
GO

-- Trigger para CartItems
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_CartItems_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_CartItems_UpdateTimestamp
    ON [dbo].[CartItems]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[CartItems]
        SET [updated_at] = GETDATE()
        FROM [dbo].[CartItems] c
        INNER JOIN inserted i ON c.id = i.id;
    END
    ');
    PRINT 'Trigger TR_CartItems_UpdateTimestamp creado';
END
GO

-- Trigger para Reviews
IF NOT EXISTS (SELECT * FROM sys.triggers WHERE name = 'TR_Reviews_UpdateTimestamp')
BEGIN
    EXEC('
    CREATE TRIGGER TR_Reviews_UpdateTimestamp
    ON [dbo].[Reviews]
    AFTER UPDATE
    AS
    BEGIN
        SET NOCOUNT ON;
        UPDATE [dbo].[Reviews]
        SET [updated_at] = GETDATE()
        FROM [dbo].[Reviews] r
        INNER JOIN inserted i ON r.id = i.id;
    END
    ');
    PRINT 'Trigger TR_Reviews_UpdateTimestamp creado';
END
GO

PRINT '=============================================';
PRINT 'Base de datos RentGamer creada exitosamente';
PRINT '=============================================';


