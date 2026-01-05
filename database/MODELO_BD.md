# 🗄️ Modelo de Base de Datos Relacional - RentGamer

## 📊 Diagrama de Entidad-Relación

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Users     │         │ Subscriptions│         │   Games     │
├─────────────┤         ├──────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)      │         │ id (PK)     │
│ email       │◄───────┐│ user_id (FK) │         │ name        │
│ password    │        ││ plan_type    │         │ category_id │
│ first_name  │        ││ start_date   │         │ price       │
│ last_name   │        ││ end_date     │         │ image       │
│ phone       │        ││ status       │         │ description │
│ created_at  │        │└──────────────┘         │ stock       │
│ updated_at  │        │                         │ created_at  │
│ is_active   │        │                         │ updated_at  │
└─────────────┘        │                         │ is_active   │
       │               │                         └─────────────┘
       │               │                                  │
       │               │                                  │
       │               │                         ┌─────────────┐
       │               │                         │ Categories   │
       │               │                         ├─────────────┤
       │               │                         │ id (PK)     │
       │               │                         │ name        │
       │               │                         │ description │
       │               │                         │ created_at  │
       │               │                         └─────────────┘
       │               │
       │               │
       ▼               ▼
┌─────────────┐  ┌──────────────┐
│  Rentals    │  │  CartItems   │
├─────────────┤  ├──────────────┤
│ id (PK)     │  │ id (PK)      │
│ user_id(FK) │  │ user_id (FK) │
│ game_id(FK) │  │ game_id (FK) │
│ start_date  │  │ quantity     │
│ end_date    │  │ created_at   │
│ total_price │  │ updated_at   │
│ status      │  └──────────────┘
│ created_at  │
│ updated_at  │
└─────────────┘
       │
       │
       ▼
┌─────────────┐
│   Reviews   │
├─────────────┤
│ id (PK)     │
│ rental_id   │
│ game_id(FK) │
│ user_id(FK) │
│ rating      │
│ comment     │
│ created_at  │
└─────────────┘
```

---

## 📋 Descripción de Tablas

### **1. Users (Usuarios)**
Almacena información de los usuarios del sistema.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único del usuario |
| `email` | NVARCHAR(255) | UNIQUE, NOT NULL | Email del usuario (usado para login) |
| `password` | NVARCHAR(255) | NOT NULL | Contraseña hasheada |
| `first_name` | NVARCHAR(100) | NOT NULL | Nombre del usuario |
| `last_name` | NVARCHAR(100) | NOT NULL | Apellido del usuario |
| `phone` | NVARCHAR(20) | NULL | Teléfono de contacto |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |
| `is_active` | BIT | DEFAULT 1 | Estado activo/inactivo |

**Índices:**
- `IX_Users_Email` en `email` (único)

---

### **2. Categories (Categorías)**
Categorías de videojuegos (Action, Adventure, Strategy, etc.).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único de la categoría |
| `name` | NVARCHAR(100) | UNIQUE, NOT NULL | Nombre de la categoría |
| `description` | NVARCHAR(500) | NULL | Descripción de la categoría |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |

**Índices:**
- `IX_Categories_Name` en `name` (único)

---

### **3. Games (Juegos)**
Catálogo de videojuegos disponibles para alquiler.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único del juego |
| `name` | NVARCHAR(255) | NOT NULL | Nombre del juego |
| `category_id` | INT | FK → Categories.id, NOT NULL | Categoría del juego |
| `price` | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Precio de alquiler por día |
| `image` | NVARCHAR(500) | NULL | URL de la imagen |
| `description` | NVARCHAR(MAX) | NULL | Descripción del juego |
| `stock` | INT | DEFAULT 1, CHECK >= 0 | Cantidad disponible |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |
| `is_active` | BIT | DEFAULT 1 | Estado activo/inactivo |

**Índices:**
- `IX_Games_CategoryId` en `category_id`
- `IX_Games_Name` en `name`

**Relaciones:**
- `FK_Games_Categories` → `Categories(id)`

---

### **4. Subscriptions (Suscripciones)**
Planes de suscripción de los usuarios.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único de la suscripción |
| `user_id` | INT | FK → Users.id, NOT NULL | Usuario suscrito |
| `plan_type` | NVARCHAR(50) | NOT NULL | Tipo de plan (basic, premium, etc.) |
| `start_date` | DATETIME2 | NOT NULL | Fecha de inicio |
| `end_date` | DATETIME2 | NULL | Fecha de fin (NULL si activa) |
| `status` | NVARCHAR(20) | DEFAULT 'active' | Estado (active, cancelled, expired) |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |

**Índices:**
- `IX_Subscriptions_UserId` en `user_id`
- `IX_Subscriptions_Status` en `status`

**Relaciones:**
- `FK_Subscriptions_Users` → `Users(id)`

---

### **5. Rentals (Alquileres)**
Registro de alquileres de juegos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único del alquiler |
| `user_id` | INT | FK → Users.id, NOT NULL | Usuario que alquila |
| `game_id` | INT | FK → Games.id, NOT NULL | Juego alquilado |
| `start_date` | DATETIME2 | NOT NULL | Fecha de inicio del alquiler |
| `end_date` | DATETIME2 | NOT NULL | Fecha de fin del alquiler |
| `returned_date` | DATETIME2 | NULL | Fecha de devolución real |
| `total_price` | DECIMAL(10,2) | NOT NULL | Precio total del alquiler |
| `status` | NVARCHAR(20) | DEFAULT 'pending' | Estado (pending, active, completed, cancelled) |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |

**Índices:**
- `IX_Rentals_UserId` en `user_id`
- `IX_Rentals_GameId` en `game_id`
- `IX_Rentals_Status` en `status`

**Relaciones:**
- `FK_Rentals_Users` → `Users(id)`
- `FK_Rentals_Games` → `Games(id)`

**Reglas de Negocio:**
- `end_date` debe ser mayor que `start_date`
- `returned_date` debe ser mayor o igual que `start_date`

---

### **6. CartItems (Items del Carrito)**
Items en el carrito de compras de los usuarios.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único del item |
| `user_id` | INT | FK → Users.id, NOT NULL | Usuario propietario del carrito |
| `game_id` | INT | FK → Games.id, NOT NULL | Juego en el carrito |
| `quantity` | INT | DEFAULT 1, CHECK > 0 | Cantidad de días de alquiler |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |

**Índices:**
- `IX_CartItems_UserId` en `user_id`
- `IX_CartItems_GameId` en `game_id`
- `UQ_CartItems_UserGame` en `(user_id, game_id)` (único)

**Relaciones:**
- `FK_CartItems_Users` → `Users(id)`
- `FK_CartItems_Games` → `Games(id)`

**Reglas de Negocio:**
- Un usuario no puede tener el mismo juego dos veces en el carrito

---

### **7. Reviews (Reseñas)**
Reseñas de juegos por usuarios.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id` | INT | PK, IDENTITY | ID único de la reseña |
| `rental_id` | INT | FK → Rentals.id, NULL | Alquiler relacionado (opcional) |
| `game_id` | INT | FK → Games.id, NOT NULL | Juego reseñado |
| `user_id` | INT | FK → Users.id, NOT NULL | Usuario que hace la reseña |
| `rating` | INT | NOT NULL, CHECK (1-5) | Calificación (1-5 estrellas) |
| `comment` | NVARCHAR(MAX) | NULL | Comentario de la reseña |
| `created_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de creación |
| `updated_at` | DATETIME2 | DEFAULT GETDATE() | Fecha de última actualización |

**Índices:**
- `IX_Reviews_GameId` en `game_id`
- `IX_Reviews_UserId` en `user_id`
- `IX_Reviews_RentalId` en `rental_id`

**Relaciones:**
- `FK_Reviews_Rentals` → `Rentals(id)` (opcional)
- `FK_Reviews_Games` → `Games(id)`
- `FK_Reviews_Users` → `Users(id)`

**Reglas de Negocio:**
- Un usuario solo puede hacer una reseña por juego
- La calificación debe estar entre 1 y 5

---

## 🔗 Relaciones entre Tablas

### **Relaciones Principales:**

1. **Users → Subscriptions** (1:N)
   - Un usuario puede tener múltiples suscripciones (historial)
   - Una suscripción pertenece a un usuario

2. **Users → Rentals** (1:N)
   - Un usuario puede tener múltiples alquileres
   - Un alquiler pertenece a un usuario

3. **Users → CartItems** (1:N)
   - Un usuario puede tener múltiples items en el carrito
   - Un item del carrito pertenece a un usuario

4. **Users → Reviews** (1:N)
   - Un usuario puede hacer múltiples reseñas
   - Una reseña pertenece a un usuario

5. **Categories → Games** (1:N)
   - Una categoría puede tener múltiples juegos
   - Un juego pertenece a una categoría

6. **Games → Rentals** (1:N)
   - Un juego puede ser alquilado múltiples veces
   - Un alquiler es de un juego

7. **Games → CartItems** (1:N)
   - Un juego puede estar en múltiples carritos
   - Un item del carrito es de un juego

8. **Games → Reviews** (1:N)
   - Un juego puede tener múltiples reseñas
   - Una reseña es de un juego

9. **Rentals → Reviews** (1:1 opcional)
   - Un alquiler puede tener una reseña (opcional)
   - Una reseña puede estar relacionada con un alquiler

---

## 📊 Cardinalidades

```
Users (1) ────< (N) Subscriptions
Users (1) ────< (N) Rentals
Users (1) ────< (N) CartItems
Users (1) ────< (N) Reviews
Categories (1) ────< (N) Games
Games (1) ────< (N) Rentals
Games (1) ────< (N) CartItems
Games (1) ────< (N) Reviews
Rentals (1) ────< (0..1) Reviews
```

---

## 🔍 Consultas Comunes

### **Obtener juegos con categoría:**
```sql
SELECT g.*, c.name as category_name
FROM Games g
INNER JOIN Categories c ON g.category_id = c.id
WHERE g.is_active = 1;
```

### **Obtener alquileres activos de un usuario:**
```sql
SELECT r.*, g.name as game_name
FROM Rentals r
INNER JOIN Games g ON r.game_id = g.id
WHERE r.user_id = @userId
  AND r.status = 'active';
```

### **Obtener carrito de un usuario:**
```sql
SELECT ci.*, g.name, g.price, g.image
FROM CartItems ci
INNER JOIN Games g ON ci.game_id = g.id
WHERE ci.user_id = @userId;
```

### **Obtener reseñas de un juego:**
```sql
SELECT r.*, u.first_name, u.last_name
FROM Reviews r
INNER JOIN Users u ON r.user_id = u.id
WHERE r.game_id = @gameId
ORDER BY r.created_at DESC;
```

---

## 🎯 Consideraciones de Diseño

1. **Índices:** Se han agregado índices en campos frecuentemente consultados para mejorar el rendimiento.

2. **Soft Delete:** Se usa `is_active` en lugar de eliminar registros físicamente.

3. **Auditoría:** Campos `created_at` y `updated_at` para rastrear cambios.

4. **Integridad Referencial:** Todas las relaciones tienen foreign keys con acciones apropiadas.

5. **Validaciones:** CHECK constraints para validar rangos y valores.

6. **Escalabilidad:** Estructura preparada para crecer con nuevas funcionalidades.

---

**Última actualización:** $(date)


