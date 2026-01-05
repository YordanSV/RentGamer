# 🗄️ Base de Datos RentGamer

## 📊 Modelo Relacional

Este directorio contiene toda la documentación y scripts relacionados con la base de datos de RentGamer.

### **Archivos Incluidos:**

1. **`MODELO_BD.md`** - Documentación completa del modelo de base de datos
   - Diagrama de entidad-relación
   - Descripción detallada de cada tabla
   - Relaciones entre tablas
   - Consultas comunes

2. **`schema.sql`** - Script de creación de la base de datos
   - Crea todas las tablas
   - Define índices y foreign keys
   - Incluye triggers para `updated_at`

3. **`seed-data.sql`** - Datos de prueba
   - Categorías de ejemplo
   - Usuarios de prueba
   - Juegos de ejemplo

4. **`MIGRACION_SQL_SERVER.md`** - Guía de migración de MySQL a SQL Server

---

## 🚀 Inicio Rápido

### **1. Crear la Base de Datos**

```sql
-- En SQL Server Management Studio o Azure Data Studio
-- Ejecutar database/schema.sql
```

### **2. Insertar Datos de Prueba (Opcional)**

```sql
-- Ejecutar database/seed-data.sql
```

### **3. Configurar Variables de Entorno**

Ver `backend/.env.example` para la configuración necesaria.

---

## 📋 Estructura de Tablas

### **Tablas Principales:**

- **Users** - Usuarios del sistema
- **Categories** - Categorías de juegos
- **Games** - Catálogo de juegos
- **Subscriptions** - Suscripciones de usuarios
- **Rentals** - Alquileres de juegos
- **CartItems** - Items en el carrito
- **Reviews** - Reseñas de juegos

Ver `MODELO_BD.md` para detalles completos.

---

## 🔗 Relaciones

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

## ☁️ Azure SQL Database

Para usar con Azure SQL Database:

1. Crear un servidor SQL en Azure Portal
2. Crear la base de datos `RentGamer`
3. Configurar firewall para permitir conexiones
4. Ejecutar `schema.sql`
5. Configurar variables de entorno con credenciales de Azure

Ver `MIGRACION_SQL_SERVER.md` para más detalles.

---

## 📝 Notas

- La base de datos usa **SQL Server / Azure SQL Database**
- Todas las tablas tienen campos de auditoría (`created_at`, `updated_at`)
- Se usa soft delete (`is_active`) en lugar de eliminar registros
- Los triggers actualizan automáticamente `updated_at`

---

**Para más información, consulta `MODELO_BD.md`**


