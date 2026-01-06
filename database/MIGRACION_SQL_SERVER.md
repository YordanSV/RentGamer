# 🔄 Guía de Migración: MySQL → SQL Server

## 📋 Cambios Realizados

### **1. Configuración de Base de Datos**

#### Antes (MySQL):
```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({...});
```

#### Ahora (SQL Server):
```javascript
const sql = require('mssql');
const pool = await sql.connect(config);
```

### **2. Sintaxis de Queries**

#### Cambios Principales:

| MySQL | SQL Server |
|-------|------------|
| `?` (placeholders) | `@paramName` (parámetros nombrados) |
| `AUTO_INCREMENT` | `IDENTITY(1,1)` |
| `DATETIME` | `DATETIME2` |
| `VARCHAR` | `NVARCHAR` |
| `TEXT` | `NVARCHAR(MAX)` |
| `insertId` | `INSERTED.id` (usando OUTPUT) |

### **3. Modelos Actualizados**

- ✅ `Game.js` - Actualizado para SQL Server
- ✅ `Category.js` - Nuevo modelo creado
- ✅ Uso de parámetros nombrados (`@id`, `@name`, etc.)
- ✅ Uso de `OUTPUT INSERTED.*` para obtener datos insertados

### **4. Package.json**

```json
{
  "dependencies": {
    "mssql": "^10.0.1"  // Reemplazó mysql2
  }
}
```

---

## 🚀 Pasos para Migrar

### **1. Instalar Dependencias**

```bash
cd backend
npm uninstall mysql2
npm install mssql
```

### **2. Configurar Variables de Entorno**

Actualizar `backend/.env`:

```env
# SQL Server Configuration
SQL_SERVER=localhost
SQL_DATABASE=RentGamer
SQL_USER=sa
SQL_PASSWORD=tu_contraseña
SQL_PORT=1433
SQL_ENCRYPT=false  # true para Azure SQL
SQL_TRUST_CERT=false  # true para desarrollo local con certificado auto-firmado
```

### **3. Crear Base de Datos**

Ejecutar `database/schema.sql` en SQL Server Management Studio o Azure Data Studio.

### **4. Migrar Datos (si aplica)**

Si tienes datos en MySQL, necesitarás exportarlos e importarlos a SQL Server.

---

## ☁️ Configuración para Azure SQL Database

### **Variables de Entorno en Azure:**

```env
SQL_SERVER=tu-servidor.database.windows.net
SQL_DATABASE=RentGamer
SQL_USER=tu-usuario@tu-servidor
SQL_PASSWORD=tu-contraseña
SQL_PORT=1433
SQL_ENCRYPT=true
SQL_TRUST_CERT=false
```

### **Connection String de Azure:**

```
Server=tcp:tu-servidor.database.windows.net,1433;Initial Catalog=RentGamer;Persist Security Info=False;User ID=tu-usuario;Password=tu-contraseña;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

---

## 🔍 Diferencias Clave

### **1. Parámetros Nombrados**

**MySQL:**
```javascript
db.query('SELECT * FROM games WHERE id = ?', [id]);
```

**SQL Server:**
```javascript
db.queryWithParams('SELECT * FROM Games WHERE id = @id', { id });
```

### **2. Obtener ID Insertado**

**MySQL:**
```javascript
const result = await db.query('INSERT INTO games...');
const newId = result.insertId;
```

**SQL Server:**
```javascript
const result = await db.queryWithParams(
  'INSERT INTO Games ... OUTPUT INSERTED.* VALUES ...',
  {...}
);
const newId = result[0].id;
```

### **3. Tipos de Datos**

- **NVARCHAR** en lugar de VARCHAR (soporte Unicode)
- **DATETIME2** en lugar de DATETIME (mayor precisión)
- **BIT** para booleanos (0/1)
- **DECIMAL(10,2)** para precios

---

## ✅ Checklist de Migración

- [ ] Instalar `mssql` package
- [ ] Actualizar variables de entorno
- [ ] Ejecutar `schema.sql` para crear tablas
- [ ] Ejecutar `seed-data.sql` para datos de prueba
- [ ] Probar conexión a la base de datos
- [ ] Probar endpoints de la API
- [ ] Verificar que todas las queries funcionen
- [ ] Actualizar documentación

---

## 🐛 Troubleshooting

### **Error: "Login failed for user"**
- Verificar usuario y contraseña
- Verificar que el usuario tenga permisos en la base de datos

### **Error: "Cannot connect to server"**
- Verificar que SQL Server esté corriendo
- Verificar firewall (Azure requiere reglas de firewall)
- Verificar puerto (1433 por defecto)

### **Error: "Encryption is required"**
- Para Azure SQL, siempre usar `SQL_ENCRYPT=true`
- Para desarrollo local, puede ser `false`

### **Error: "Invalid object name"**
- Verificar que las tablas existan
- Verificar que estés conectado a la base de datos correcta
- SQL Server es case-sensitive en algunos casos

---

## 📚 Recursos

- [mssql npm package](https://www.npmjs.com/package/mssql)
- [SQL Server Documentation](https://docs.microsoft.com/sql/)
- [Azure SQL Database](https://azure.microsoft.com/services/sql-database/)

---

**Última actualización:** $(date)


