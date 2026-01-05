# 🔐 Variables de Entorno - RentGamer Backend

## 📍 Ubicación

Las variables de entorno se configuran en el archivo **`backend/.env`**

Este archivo **NO debe subirse a Git** (está en `.gitignore`).

---

## 📝 Variables Requeridas

### **Base de Datos (SQL Server)**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_SERVER` | Servidor de base de datos | `localhost` o `rentgamer-server.database.windows.net` |
| `DB_NAME` | Nombre de la base de datos | `RentGamer` |
| `DB_USER` | Usuario de la base de datos | `sa` o `admin@rentgamer-server` |
| `DB_PASSWORD` | Contraseña de la base de datos | `tu_contraseña_segura` |
| `DB_PORT` | Puerto de la base de datos | `1433` (por defecto) |
| `DB_ENCRYPT` | Habilitar encriptación | `true` (Azure) o `false` (local) |
| `DB_TRUST_CERT` | Confiar en certificado | `false` (solo `true` para desarrollo local) |

### **Servidor**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor Express | `3001` (local) o `8080` (Azure) |
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |

### **CORS**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `FRONTEND_URL` | URL del frontend para CORS | `http://localhost:3000` o `https://tu-app.azurestaticapps.net` |

---

## 🏠 Configuración para Desarrollo Local

Crear archivo `backend/.env`:

```env
# Base de Datos Local
DB_SERVER=localhost
DB_NAME=RentGamer
DB_USER=sa
DB_PASSWORD=tu_contraseña_local
DB_PORT=1433
DB_ENCRYPT=false
DB_TRUST_CERT=false

# Servidor
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

---

## ☁️ Configuración para Azure

### **En Azure App Service:**

1. Ir a **App Service** → **Configuración** → **Variables de aplicación**
2. Agregar las siguientes variables:

```env
DB_SERVER=rentgamer-server.database.windows.net
DB_NAME=rentgamer-db
DB_USER=rentgamer-admin@rentgamer-server
DB_PASSWORD=tu_contraseña_de_azure
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_CERT=false

PORT=8080
NODE_ENV=production

FRONTEND_URL=https://rentgamer-frontend.azurestaticapps.net
```

**⚠️ Importante:**
- El usuario en Azure debe tener formato: `usuario@servidor`
- `DB_ENCRYPT` debe ser `true` para Azure SQL Database
- Azure usa automáticamente el puerto de la variable `PORT`

---

## 🔄 Variables Alternativas (Compatibilidad)

El código también acepta estos nombres alternativos por compatibilidad:

| Nombre Principal | Alternativo |
|-----------------|-------------|
| `DB_SERVER` | `DATABASE_SERVER` |
| `DB_NAME` | `DATABASE_NAME` |
| `DB_USER` | `DATABASE_USER` |
| `DB_PASSWORD` | `DATABASE_PASSWORD` |
| `DB_PORT` | `DATABASE_PORT` |

---

## ✅ Verificar Configuración

Para verificar que las variables están configuradas correctamente:

1. **Localmente:**
   ```bash
   cd backend
   node -e "require('dotenv').config(); console.log(process.env.DB_SERVER)"
   ```

2. **En Azure:**
   - Ir a **App Service** → **Configuración** → **Variables de aplicación**
   - Verificar que todas las variables estén presentes

---

## 🐛 Troubleshooting

### **Error: "Cannot connect to server"**
- Verificar `DB_SERVER` (debe ser el nombre completo del servidor)
- Verificar firewall de Azure SQL (debe permitir Azure services)

### **Error: "Login failed for user"**
- Verificar `DB_USER` y `DB_PASSWORD`
- En Azure, el usuario debe tener formato: `usuario@servidor`

### **Error: "Encryption is required"**
- Para Azure, `DB_ENCRYPT` debe ser `true`
- Para desarrollo local, puede ser `false`

---

## 📚 Archivos Relacionados

- `backend/.env.example` - Plantilla de variables de entorno
- `backend/src/config/database.js` - Donde se usan las variables
- `.gitignore` - Asegura que `.env` no se suba a Git

---

**💡 Tip:** Copia `backend/.env.example` a `backend/.env` y completa los valores.


