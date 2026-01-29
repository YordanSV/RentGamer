# Resumen de Configuración del Frontend - RentGamer

**Fecha**: Enero 2026  
**Versión**: 1.0.0  
**Estado**: ✅ Completamente Configurado

---

## 📋 Resumen Ejecutivo

El frontend de RentGamer ha sido completamente configurado para funcionar con:
- ✅ Backend Node.js en Azure App Service
- ✅ Base de datos Azure SQL Server
- ✅ Azure Static Web Apps para hosting
- ✅ Azure Blob Storage para imágenes
- ✅ React Router para SPA
- ✅ Variables de entorno por ambiente

---

## 📁 Archivos Configurados

### 1. **API Configuration**
- `src/api/apiClient.js` - Cliente HTTP con axios
- `src/api/endpoints.js` - Definición de todos los endpoints
- `src/config/apiConfig.js` - Configuración por ambiente (**NUEVO**)

### 2. **Environment Variables**
- `frontend/.env.example` - Plantilla de variables (**NUEVO**)
- `../.env.example` - Plantilla global (**NUEVO**)

### 3. **Configuration Files**
- `package.json` - Actualizado con nombre correcto (rentgamer)
- `staticwebapp.config.json` - Configurado para Azure SWA
- `GUIA_CONFIGURACION_FRONTEND.md` - Guía completa (**NUEVO**)

---

## 🔧 Configuración Técnica

### Variables de Entorno Requeridas

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8080  (dev) o https://api.azurewebsites.net (prod)

# Blob Storage
REACT_APP_BLOB_STORAGE_URL=http://localhost:3000 (dev) o https://rentgamerstorage.blob.core.windows.net (prod)

# Configuración
REACT_APP_NAME=RentGamer
REACT_APP_VERSION=1.0.0
NODE_ENV=development  (dev) o production (prod)
REACT_APP_DEBUG=true  (dev) o false (prod)
```

### URLs de Endpoints Disponibles

```javascript
// Juegos
GET  /api/games          // Obtener todos
GET  /api/games/:id      // Obtener por ID
GET  /api/games/search   // Buscar

// Usuarios
POST /api/users/register
POST /api/users/login
GET  /api/users/profile

// Carrito
GET  /api/cart
POST /api/cart/items
DELETE /api/cart/items/:id

// Y más... (Ver src/api/endpoints.js)
```

---

## 🚀 Flujo de Desarrollo

### 1. Desarrollo Local

```bash
cd frontend
cp .env.example .env
# Editar .env:
# REACT_APP_API_URL=http://localhost:8080
# NODE_ENV=development
# REACT_APP_DEBUG=true

npm install
npm start  # Abre http://localhost:3000
```

### 2. Build para Producción

```bash
# Actualizar .env con URLs de producción
REACT_APP_API_URL=https://api-prod.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
NODE_ENV=production

npm run build
npm run serve  # Verificar localmente
```

### 3. Despliegue en Azure

Las variables de entorno en Azure Portal reemplazan las del `.env`:

```
Azure Portal > Static Web App > Settings > Configuration:
- REACT_APP_API_URL
- REACT_APP_BLOB_STORAGE_URL
- REACT_APP_CDN_URL (opcional)
- NODE_ENV=production
- REACT_APP_DEBUG=false
```

---

## 🔌 Integración Backend

### ¿Cómo se conecta el frontend con el backend?

1. **Desarrollo Local**:
   ```
   Frontend (http://localhost:3000) 
   → apiClient.js 
   → REACT_APP_API_URL (http://localhost:8080)
   → Backend Express
   ```

2. **Producción (Azure)**:
   ```
   Frontend (Azure Static Web App)
   → apiClient.js
   → REACT_APP_API_URL (Azure App Service)
   → Backend Node.js
   → Azure SQL Database
   ```

### Headers HTTP Configurados

```javascript
{
  'Content-Type': 'application/json',
  // Opcional: Authorization: `Bearer ${token}` (cuando se implemente auth)
}
```

### Timeout y Reintentos

- Timeout: 15 segundos (adaptado para latencia de Azure)
- Sin reintentos automáticos (se pueden agregar en interceptores)
- Manejo de errores centralizado

---

## 🎨 Gestión de Imágenes

### Estrategia Actual

| Tipo | Ubicación | Cómo se carga |
|------|-----------|-----------------|
| **Imágenes de juegos (21)** | Azure Blob Storage | Desde `REACT_APP_BLOB_STORAGE_URL` |
| **UI/Logo/Hero (11)** | `frontend/public/` | Rutas locales `/control.png` |
| **Favicon** | `frontend/public/` | Ruta local |

### Función auxiliar

```javascript
import { getImageUrl } from './config/apiConfig';

// Decisión automática: local o Blob Storage según ambiente
const gameImageUrl = getImageUrl('action1.png', 'imgGames');
// Desarrollo: /imgGames/action1.png
// Producción: https://rentgamerstorage.blob.core.windows.net/imgGames/action1.png
```

---

## ✅ Checklist de Configuración

- [x] Cliente HTTP configurado (axios + interceptores)
- [x] Endpoints centralizados
- [x] Variables de entorno por ambiente
- [x] CORS compatible con backend
- [x] Timeout adaptado para Azure
- [x] SPA routing configurado (React Router + fallback)
- [x] Static Web App configurado
- [x] Seguridad headers agregados (CSP, X-Frame-Options)
- [x] Manejo de errores centralizado
- [x] Estrategia de imágenes definida
- [x] Documentación completa

---

## 🔍 Verificación Rápida

### ¿Cómo verificar que todo funciona?

1. **Variables de entorno**:
   ```bash
   cd frontend
   npm start
   # Abre DevTools > Console
   # Debes ver: "[API Client] Usando API URL: http://localhost:8080"
   ```

2. **Conexión a backend**:
   ```bash
   # En otra terminal
   cd backend
   npm start
   # Backend debe estar en http://localhost:8080
   ```

3. **Requests a API**:
   ```bash
   # Navega a Shop en frontend
   # DevTools > Network > Filtra por "XHR"
   # Debes ver request a http://localhost:8080/api/games
   # Response debe ser: { success: true, data: [...] }
   ```

---

## 📚 Documentación Relacionada

- `GUIA_CONFIGURACION_FRONTEND.md` - Guía detallada de configuración
- `GUIA_AZURE_BLOB_STORAGE.md` - Setup de imágenes en Azure
- `backend/ESTRUCTURA.md` - Estructura del backend
- `backend/README_VARIABLES.md` - Variables del backend

---

## 🛠️ Próximos Pasos

1. **Crear Azure Storage Account** (si no existe)
   - Nombre: `rentgamerstorage`
   - Container: `imgGames` (acceso público)
   - Ver: `GUIA_AZURE_BLOB_STORAGE.md`

2. **Subir imágenes a Blob Storage**
   - 21 imágenes de juegos
   - Desde: `frontend/public/imgGames/`
   - A: Azure Blob Storage

3. **Configurar en Azure Portal**
   - Static Web App > Settings > Configuration
   - Agregar variables de entorno de producción

4. **Desplegar**
   ```bash
   git add .
   git commit -m "Frontend configuration complete"
   git push origin master
   # Azure hace build y deploy automáticamente
   ```

---

## 💡 Notas Importantes

### 1. Variables de Entorno
- ⚠️ NO son variables de runtime, se reemplazan en BUILD TIME
- ⚠️ Cambiar `.env` requiere `npm run build` nuevamente
- ⚠️ En Azure, cambiar configuración requiere rebuildar

### 2. CORS
- ✅ Backend debe permitir requests desde frontend URL
- ⚠️ En desarrollo: `http://localhost:3000`
- ⚠️ En producción: URL de Azure Static Web App

### 3. Imágenes
- ✅ Imágenes de juegos → Azure Blob Storage (actualizar frecuentemente)
- ✅ Imágenes de UI → Frontend local (cambian raramente)

### 4. Security Headers
- ✅ CSP (Content Security Policy)
- ✅ X-Frame-Options (prevenir clickjacking)
- ✅ X-XSS-Protection
- ✅ No-Sniff Content-Type

---

## 📞 Soporte

Para problemas comunes, ver sección **Troubleshooting** en:
- `GUIA_CONFIGURACION_FRONTEND.md`

Errores comunes:
- CORS error → Verificar URL en FRONTEND_URL del backend
- Imágenes no cargan → Verificar REACT_APP_BLOB_STORAGE_URL
- API no responde → Verificar REACT_APP_API_URL y que backend esté corriendo
- Variables no actualizan → Hacer build nuevamente

---

**Configuración completada exitosamente** ✅  
**Frontend listo para desarrollo y producción** 🚀
