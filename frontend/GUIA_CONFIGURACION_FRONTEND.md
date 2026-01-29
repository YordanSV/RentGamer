# Guía Completa de Configuración del Frontend

## Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Variables de Entorno](#variables-de-entorno)
3. [Configuración de API](#configuración-de-api)
4. [Desarrollo Local](#desarrollo-local)
5. [Build y Producción](#build-y-producción)
6. [Despliegue en Azure Static Web Apps](#despliegue-en-azure-static-web-apps)
7. [Troubleshooting](#troubleshooting)

---

## Estructura del Proyecto

```
frontend/
├── public/                 # Archivos estáticos servidos tal cual
│   ├── index.html         # Punto de entrada HTML
│   ├── imgGames/          # Imágenes locales de juegos (serán movidas a Blob Storage)
│   ├── favicon.ico        # Icono de la aplicación
│   └── *.png, *.jpg       # Otros assets locales
│
├── src/
│   ├── api/               # Lógica de comunicación con backend
│   │   ├── apiClient.js   # Instancia de axios configurada
│   │   ├── endpoints.js   # Definición de todos los endpoints
│   │   └── gameApi.js     # Servicios específicos de juegos
│   │
│   ├── config/            # Configuraciones
│   │   └── apiConfig.js   # Configuración por ambiente
│   │
│   ├── components/        # Componentes React reutilizables
│   ├── pages/             # Páginas/vistas principales
│   ├── contexts/          # Context API (estado global)
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Funciones utilitarias
│   ├── styles/            # Estilos globales
│   ├── App.js             # Componente raíz
│   └── index.js           # Punto de entrada JS
│
├── build/                 # Archivos compilados (generado por build)
├── .env.example           # Plantilla de variables de entorno
├── package.json           # Dependencias y scripts
├── staticwebapp.config.json  # Configuración para Azure Static Web Apps
└── README.md              # Documentación

```

---

## Variables de Entorno

### ¿Dónde configurar?

Crea un archivo `.env` en la carpeta `/frontend` (no committear este archivo, está en `.gitignore`):

```bash
cd frontend
cp .env.example .env
# Editar .env con tus valores
```

### Variables disponibles

| Variable | Ejemplo | Descripción |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:8080` | URL base del backend |
| `REACT_APP_NAME` | `RentGamer` | Nombre de la app (usado en título) |
| `REACT_APP_VERSION` | `1.0.0` | Versión de la aplicación |
| `REACT_APP_BLOB_STORAGE_URL` | `https://rentgamerstorage.blob.core.windows.net` | URL de Azure Blob Storage |
| `REACT_APP_CDN_URL` | `https://rentgamer-cdn.azureedge.net` | URL de CDN (opcional) |
| `NODE_ENV` | `production` | Ambiente (development/production) |
| `REACT_APP_DEBUG` | `true` | Activar logs de debug |

### Ejemplo de `.env` para diferentes ambientes

**Desarrollo Local:**
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_BLOB_STORAGE_URL=http://localhost:3000
NODE_ENV=development
REACT_APP_DEBUG=true
```

**Producción (Azure):**
```env
REACT_APP_API_URL=https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
REACT_APP_CDN_URL=https://rentgamer-cdn.azureedge.net
NODE_ENV=production
REACT_APP_DEBUG=false
```

---

## Configuración de API

### 1. Cliente de API (`src/api/apiClient.js`)

Configura automáticamente:
- **Base URL**: Desde `REACT_APP_API_URL`
- **Timeout**: 15 segundos (para latencia de Azure)
- **Headers**: `Content-Type: application/json`
- **Interceptores**: Manejo automático de errores

```javascript
import apiClient from './api/apiClient';

// Ejemplo de uso
const response = await apiClient.get('/api/games');
```

### 2. Endpoints (`src/api/endpoints.js`)

Define todos los endpoints disponibles:

```javascript
import { API_ENDPOINTS } from './api/endpoints';

// Ejemplos:
API_ENDPOINTS.GAMES.ALL           // /api/games
API_ENDPOINTS.GAMES.BY_ID(1)      // /api/games/1
API_ENDPOINTS.USERS.REGISTER      // /api/users/register
API_ENDPOINTS.CART.GET_CART       // /api/cart
```

### 3. Configuración centralizada (`src/config/apiConfig.js`)

Selecciona automáticamente la configuración según el ambiente:

```javascript
import apiConfig, { getImageUrl, getApiUrl } from './config/apiConfig';

// Obtener URL de imagen (decide automáticamente si es local o Blob Storage)
const imgUrl = getImageUrl('action1.png', 'imgGames');

// Obtener URL completa de API
const apiUrl = getApiUrl('/api/games');
```

---

## Desarrollo Local

### Prerequisitos

- Node.js 16+ instalado
- npm o yarn
- Backend corriendo en `http://localhost:8080`

### Pasos

1. **Instalar dependencias**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env y asegurar:
   # REACT_APP_API_URL=http://localhost:8080
   # NODE_ENV=development
   # REACT_APP_DEBUG=true
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm start
   ```
   - La app se abrirá en `http://localhost:3000`
   - Los cambios se recargan automáticamente (HMR)

4. **Verificar conexión a backend**
   - Abre DevTools (F12)
   - Verifica la pestaña Network
   - Intenta navegar a Shop - debe hacer request a `/api/games`
   - Si ves errores CORS, verifica la configuración en backend

### Comandos útiles

```bash
# Iniciar desarrollo
npm start

# Build para producción
npm run build

# Ejecutar tests
npm test

# Servir build localmente (requiere `serve` instalado)
npm run serve
```

---

## Build y Producción

### Crear build de producción

```bash
cd frontend

# Asegúrate de tener las variables correctas en .env
# REACT_APP_API_URL=https://tu-backend-azure.azurewebsites.net
# NODE_ENV=production

npm run build
```

**Resultado**: Crea carpeta `build/` lista para desplegar

### Verificar build localmente

```bash
# Instalar serve globalmente (si no lo tienes)
npm install -g serve

# Servir el build
serve -s build

# Acceder a http://localhost:3000
```

### Contenido del build

```
build/
├── index.html          # Archivo principal
├── static/
│   ├── css/           # Estilos compilados y minificados
│   └── js/            # JavaScript compilado y minificado
├── imgGames/          # Imágenes locales
└── favicon.ico        # Icono
```

---

## Despliegue en Azure Static Web Apps

### 1. Crear Static Web App

```bash
# Opción A: Desde Azure Portal
# 1. Resource Group: crea uno nuevo o usa existente
# 2. Name: rentgamer-frontend
# 3. Plan: Free
# 4. Region: East US 2
# 5. Source: GitHub (si usas GitHub Actions)

# Opción B: Desde CLI
az staticwebapp create \
  --name rentgamer-frontend \
  --resource-group RentGamer \
  --source https://github.com/tu-usuario/RentGamer \
  --branch master \
  --build-folder frontend \
  --api-location backend \
  --output-location build
```

### 2. Configurar variables de entorno

En Azure Portal > Static Web App > Settings > Configuration:

```
REACT_APP_API_URL = https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL = https://rentgamerstorage.blob.core.windows.net
REACT_APP_CDN_URL = https://rentgamer-cdn.azureedge.net
REACT_APP_NAME = RentGamer
REACT_APP_VERSION = 1.0.0
NODE_ENV = production
REACT_APP_DEBUG = false
```

### 3. GitHub Actions (si aplica)

El flujo de despliegue automático se configura en `.github/workflows/`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - master
  pull_request:

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v0.0.1-preview
        with:
          app_location: "frontend"
          api_location: "backend"
          output_location: "build"
```

### 4. Configuración de rutas (`staticwebapp.config.json`)

Ya configurado para:
- ✅ SPA routing (rutas React funcionan correctamente)
- ✅ Proxy a API backend
- ✅ Headers de seguridad (CSP, X-Frame-Options, etc.)
- ✅ Exclusión de rutas API
- ✅ Fallback a index.html para rutas no encontradas

### 5. Variables de entorno en producción

Los valores en `.env` del repositorio NO se usan. Usa las configuradas en Azure Portal.

---

## Troubleshooting

### "Cannot GET /api/games" (Error 404)

**Causa**: Backend no está corriendo o URL es incorrecta

**Solución**:
```bash
# 1. Verificar backend está corriendo en 8080
curl http://localhost:8080/health

# 2. Verificar .env en frontend tiene URL correcta
grep REACT_APP_API_URL frontend/.env

# 3. Revisar DevTools > Network para ver URL real de request
```

### "CORS error" 

**Causa**: Backend no tiene CORS configurado para tu frontend

**Solución en backend** (`src/config/cors.js`):
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};
```

**Y asegúrate que FRONTEND_URL en `.env` del backend coincida con tu frontend**

### Imágenes no cargan

**Si están en `/imgGames/`:**
- Local: Deben estar en `frontend/public/imgGames/`
- Producción: Verifica que `REACT_APP_BLOB_STORAGE_URL` es correcto

**Verificar:**
```javascript
import { getImageUrl } from './config/apiConfig';
console.log(getImageUrl('action1.png')); // Debe mostrar URL completa correcta
```

### Build muy lento o fails

**Solución**:
```bash
# Limpiar cache
rm -rf node_modules build package-lock.json
npm install
npm run build
```

### Variables de entorno no se actualizan

**Importante**: Las variables de entorno se reemplazan en BUILD TIME, no en runtime.

**Esto significa**:
1. Cambiar `.env` requiere `npm start` o `npm run build` nuevamente
2. En Azure, cambiar configuración requiere rebuildar el deploy

**Forzar rebuild en Azure**:
```bash
git commit --allow-empty -m "Force rebuild"
git push
```

### "Module not found" errors

```bash
# Reinstalar dependencias
cd frontend
npm install

# O si está roto
rm -rf node_modules package-lock.json
npm install
```

---

## Checklist de Despliegue

Antes de desplegar a producción, verifica:

- [ ] `npm run build` completa sin errores
- [ ] Variables de entorno configuradas en Azure Portal
- [ ] Backend está accesible en su URL de producción
- [ ] CORS configurado en backend para tu frontend URL
- [ ] Imágenes están disponibles (locales o en Blob Storage)
- [ ] `staticwebapp.config.json` está correcto
- [ ] Links de navegación funcionan (rutas React)
- [ ] API calls funcionan (DevTools > Network)
- [ ] No hay errores en Console (DevTools)
- [ ] Performance es aceptable (Lighthouse)

---

## Referencias Útiles

- [Create React App Docs](https://create-react-app.dev/)
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [React Router](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/)
- [Environment Variables in CRA](https://create-react-app.dev/docs/adding-custom-environment-variables/)
