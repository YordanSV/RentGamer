# 🎮 RentGamer - Project Evidence

## Evidencia del Proyecto

Este documento contiene toda la evidencia de la infraestructura Azure, estructura del backend y esquema de base de datos del proyecto RentGamer.

---

## 📸 Capturas de Pantalla Requeridas

### 1️⃣ Azure Resource Group (`azure-resource-group.png`)

**Dónde tomar la captura:**
1. Ve a: https://portal.azure.com
2. Busca "Resource groups" en la barra de búsqueda
3. Haz clic en tu grupo de recursos
4. Toma una captura que muestre:
   - ✅ Static Web App
   - ✅ App Service (Backend)
   - ✅ SQL Server
   - ✅ SQL Database
   - ✅ Storage Account

**Recursos en tu Azure:**
```
Grupo de Recursos: (tu nombre de grupo)
├── Static Web App: gentle-beach-02b34a00f
├── App Service: rentgamer-api-d5hzc6gahsc7ecaj
├── SQL Server: rentgamer-sql.database.windows.net
├── SQL Database: RentGamerDB
└── Storage Account: rentgamerstorage
```

---

### 2️⃣ Backend Structure (`backend-structure.png`)

**Ya está lista - Estructura del Backend:**

```
backend/
├── src/
│   ├── app.js                    # Configuración principal de Express
│   ├── server.js                 # Punto de entrada del servidor
│   ├── config/
│   │   ├── database.js          # ⭐ Configuración de SQL Server
│   │   └── cors.js              # Configuración CORS
│   ├── controllers/
│   │   └── gameController.js    # ⭐ Controlador de juegos
│   ├── routes/
│   │   └── gameRoutes.js        # ⭐ Rutas de la API
│   ├── services/
│   │   └── gameService.js       # ⭐ Lógica de negocio
│   ├── models/
│   │   ├── Game.js              # Modelo de juego
│   │   └── Category.js          # Modelo de categoría
│   ├── validators/
│   │   └── gameValidator.js     # ⭐ Validación de datos
│   └── middleware/
│       ├── errorHandler.js      # Manejo de errores
│       └── logger.js            # Registro de logs
├── package.json
├── .env                         # Variables de entorno
└── README.md
```

**Cómo tomar la captura:**
- Abre VS Code con la carpeta `backend`
- Expande la estructura en el explorador de archivos
- Captura la vista del árbol de carpetas

---

### 3️⃣ Key Backend File (`backend-service.png`)

**Archivos clave a mostrar (elige uno):**

#### Opción A: `database.js` (Configuración de Base de Datos)
```javascript
// backend/src/config/database.js
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
```

#### Opción B: `gameService.js` (Lógica de Negocio)
Ver archivo en: `backend/src/services/gameService.js`

#### Opción C: `gameRoutes.js` (Rutas API)
Ver archivo en: `backend/src/routes/gameRoutes.js`

**Cómo tomar la captura:**
- Abre uno de estos archivos en VS Code
- Captura el código completo o las funciones principales

---

### 4️⃣ Database Schema (`db-schema.png`)

**Esquema de Base de Datos - Tabla Principal Games:**

```sql
-- Tabla: Games (Juegos)
CREATE TABLE Games (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL,
    image NVARCHAR(500),
    category_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT FK_Games_Categories 
        FOREIGN KEY (category_id) 
        REFERENCES Categories(id)
);

-- Tabla: Categories (Categorías)
CREATE TABLE Categories (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE()
);

-- Índices
CREATE INDEX IX_Games_CategoryId ON Games(category_id);
CREATE INDEX IX_Games_Price ON Games(price);
CREATE INDEX IX_Games_Name ON Games(name);
```

**Estructura de Datos:**
```
Categories (Categorías de juegos)
├── id: INT (PK)
├── name: NVARCHAR(100) - Nombre de la categoría
├── description: NVARCHAR(500) - Descripción
└── created_at: DATETIME

Games (Juegos disponibles)
├── id: INT (PK)
├── name: NVARCHAR(255) - Nombre del juego
├── description: NVARCHAR(MAX) - Descripción
├── price: DECIMAL(10,2) - Precio de alquiler
├── image: NVARCHAR(500) - URL de la imagen
├── category_id: INT (FK → Categories)
├── created_at: DATETIME
└── updated_at: DATETIME
```

**Archivos con el esquema completo:**
- `database/schema.sql` - Script completo de creación
- `database/MODELO_BD.md` - Documentación del modelo

**Cómo tomar la captura:**
- Opción 1: Abre `database/schema.sql` en VS Code
- Opción 2: Conéctate a Azure SQL Database y captura las tablas
- Opción 3: Usa este documento como referencia visual

---

## 🌐 URLs del Proyecto

### Frontend (Producción)
- ✅ Azure Static Web App: https://gentle-beach-02b34a00f.6.azurestaticapps.net
- ✅ Netlify: https://rentgamer.netlify.app

### Backend API
- ✅ Azure App Service: https://rentgamer-api-d5hzc6gahsc7ecaj.eastus2-01.azurewebsites.net

### Base de Datos
- ✅ SQL Server: rentgamer-sql.database.windows.net
- ✅ Database: RentGamerDB

### Storage
- ✅ Blob Storage: https://rentgamerstorage.blob.core.windows.net
- ✅ Container: img-games

---

## 🚀 Tecnologías Utilizadas

### Frontend
- React 18.3.1
- React Router DOM 6.24.0
- Styled Components 6.1.12
- Anime.js 3.2.1 (animaciones)
- Axios 1.7.2
- FontAwesome

### Backend
- Node.js
- Express.js
- MSSQL (Driver para SQL Server)
- CORS
- Dotenv

### Base de Datos
- Azure SQL Database
- SQL Server

### Infraestructura
- Azure Static Web Apps
- Azure App Service
- Azure SQL Database
- Azure Blob Storage
- Netlify (alternativa)

---

## 📂 Estructura Completa del Proyecto

```
RentGamer/
├── frontend/                    # Aplicación React
│   ├── public/
│   │   └── img-games/          # Imágenes locales
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── home/
│   │   │   └── shop/
│   │   ├── pages/              # Páginas principales
│   │   ├── api/                # Cliente API
│   │   ├── config/             # Configuración
│   │   ├── contexts/           # Context API
│   │   ├── hooks/              # Custom Hooks
│   │   ├── utils/              # Utilidades
│   │   └── styles/             # Estilos globales
│   ├── build/                  # Build de producción
│   └── package.json
│
├── backend/                     # API Node.js/Express
│   ├── src/
│   │   ├── config/             # Configuraciones
│   │   ├── controllers/        # Controladores
│   │   ├── routes/             # Rutas API
│   │   ├── services/           # Lógica de negocio
│   │   ├── models/             # Modelos de datos
│   │   ├── validators/         # Validaciones
│   │   ├── middleware/         # Middlewares
│   │   ├── app.js              # Config Express
│   │   └── server.js           # Entrada del servidor
│   ├── .env                    # Variables de entorno
│   └── package.json
│
├── database/                    # Scripts de BD
│   ├── schema.sql              # ⭐ Esquema completo
│   ├── seed-data.sql           # Datos de ejemplo
│   ├── MODELO_BD.md            # ⭐ Documentación
│   └── migrate-games.js        # Script de migración
│
└── docs/                        # Documentación
    ├── DEPLOYMENT.md           # Guía de despliegue
    ├── GUIA_AZURE_BLOB_STORAGE.md
    ├── ANIME_JS_GUIA.md        # Guía de animaciones
    └── PROJECT_EVIDENCE.md     # ⭐ Este archivo
```

---

## 📝 Instrucciones para Capturas

### Para tomar las 4 capturas requeridas:

1. **azure-resource-group.png**:
   - Portal Azure → Resource Groups → Tu grupo → Captura de pantalla

2. **backend-structure.png**:
   - VS Code → Carpeta backend → Explorador de archivos expandido → Captura

3. **backend-service.png**:
   - VS Code → Abre `src/config/database.js` o `src/services/gameService.js` → Captura

4. **db-schema.png**:
   - VS Code → Abre `database/schema.sql` → Captura la sección CREATE TABLE

---

## ✅ Checklist de Evidencia

- [ ] Captura del Azure Resource Group completo
- [ ] Captura de la estructura del backend en VS Code
- [ ] Captura de un archivo clave del backend
- [ ] Captura del esquema de base de datos
- [ ] URLs del proyecto funcionando
- [ ] README.md actualizado
- [ ] Código en GitHub

---

## 🎯 Funcionalidades Implementadas

✅ Catálogo de juegos con filtros por categoría
✅ Sistema de carrito de compras
✅ Animaciones con Anime.js
✅ Diseño responsive
✅ API RESTful con Node.js/Express
✅ Base de datos SQL Server en Azure
✅ Almacenamiento de imágenes en Blob Storage
✅ CORS configurado para múltiples orígenes
✅ Validación de datos
✅ Manejo de errores centralizado
✅ Logging de todas las peticiones
✅ Despliegue en Azure y Netlify

---

**Fecha:** Febrero 2026
**Autor:** Yordan SV
**Proyecto:** RentGamer - Plataforma de Alquiler de Videojuegos
