# 🚀 Guía de Despliegue - RentGamer

Complete guide for deploying RentGamer to Azure with automated CI/CD.

---

## 📋 Tabla de Contenidos

1. [Arquitectura](#arquitectura)
2. [Costos](#costos)
3. [Desarrollo Local](#desarrollo-local)
4. [Despliegue a Azure](#despliegue-a-azure)
5. [Configuración de Imágenes](#configuración-de-imágenes)
6. [CI/CD Automático](#cicd-automático)
7. [Troubleshooting](#troubleshooting)

---

## Arquitectura

### **Stack Completo en Azure**

```
┌─────────────────────────────────────────────────────┐
│  Cliente (Navegador)                                │
└────────────────────┬────────────────────────────────┘
                     │
     ┌───────────────┴────────────────┐
     │                                │
┌────▼────────────────┐    ┌─────────▼──────────┐
│  Azure Static       │    │  Azure Storage     │
│  Web Apps           │    │  (CDN para        │
│  (Frontend React)   │    │   imágenes)        │
└────┬────────────────┘    └────────────────────┘
     │
     │ HTTPS
     │
┌────▼────────────────────────────────────┐
│  Azure App Service                      │
│  (Backend Node.js Express)              │
└────┬─────────────────────────────────────┘
     │
     │
┌────▼────────────────────────────────────┐
│  Azure SQL Database                     │
│  (SQL Server - RentGamerDB)             │
└─────────────────────────────────────────┘
```

### **Componentes**

| Componente | Tecnología | Hosting | Costo/mes |
|-----------|-----------|---------|-----------|
| Frontend | React 18 | Azure Static Web Apps | $0 (Free) |
| Backend | Node.js Express | Azure App Service | $13 (Standard) |
| Base de Datos | Azure SQL Server | Azure SQL Database | $15-50 |
| Imágenes | PNG/JPG | Azure Blob Storage + CDN | $0.60 |
| CI/CD | GitHub Actions | GitHub | $0 (included) |
| **Total** | | | **~$29-60/mes** |

---

## Costos

### **Free Tier (Demo/Testing)**
- Frontend: Static Web Apps Free = $0
- Backend: App Service F1 = $0 (limitado: 60 min CPU/día)
- Database: Azure SQL Free Tier = $0
- Storage: Blob Storage = ~$0.60
- **Total: ~$0.60/mes** (muy limitado para producción)

### **Pequeña Producción**
- Frontend: Static Web Apps = $0
- Backend: App Service Standard B1 = $13
- Database: Azure SQL Standard = $15
- Storage + CDN = $0.60
- **Total: ~$29/mes**

### **Mediana Producción**
- Frontend: Static Web Apps = $0
- Backend: App Service Standard B2 = $50
- Database: Azure SQL Standard = $30
- Storage + CDN = $0.60
- **Total: ~$81/mes**

---

## Desarrollo Local

### **Requisitos**

- Node.js 18+
- npm o yarn
- Azure CLI (para desplegar)
- GitHub cuenta (para CI/CD)

### **Instrucciones**

1. **Clonar repositorio**
```bash
git clone https://github.com/YordanSV/RentGamer.git
cd RentGamer
```

2. **Instalar dependencias**
```bash
# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
npm install
cd ..
```

3. **Configurar variables de entorno**

Backend (`.env` en carpeta `backend/`):
```env
DB_SERVER=localhost
DB_NAME=RentGamerDB
DB_USER=sa
DB_PASSWORD=YourPassword123!
DB_ENCRYPT=true
DB_TRUST_CERT=true
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Frontend (`.env` en carpeta `frontend/`):
```env
REACT_APP_API_URL=http://localhost:8080
NODE_ENV=development
REACT_APP_DEBUG=true
```

4. **Iniciar aplicación**

Backend (Terminal 1):
```bash
cd backend
npm start
# ✅ Debe mostrar: "Servidor escuchando en puerto 8080"
```

Frontend (Terminal 2):
```bash
cd frontend
npm start
# ✅ Se abre en http://localhost:3000
```

5. **Verificar funcionamiento**

- Frontend: http://localhost:3000
- Backend: http://localhost:8080/health
- Navega a Shop y verifica que cargan los juegos

---

## Despliegue a Azure

### **Paso 1: Crear Static Web App**

[Ver guía completa: GUIA_DESPLIEGUE_AZURE.md](./GUIA_DESPLIEGUE_AZURE.md)

```bash
# Opción A: Azure Portal (recomendado para principiantes)
# https://portal.azure.com
# Busca "Static Web Apps" y sigue los pasos

# Opción B: Azure CLI
az extension add --name staticwebapp

az staticwebapp create \
  --name rentgamer-frontend \
  --resource-group RentGamer \
  --source https://github.com/YordanSV/RentGamer \
  --location eastus2 \
  --branch master \
  --build-folder frontend \
  --output-location build
```

Resultado: `https://graceful-beach-xxxxx.azurestaticapps.net`

### **Paso 2: Configurar Variables de Entorno**

En Azure Portal > Static Web App > Settings > Configuration:

```
REACT_APP_API_URL = https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL = https://rentgamerstorage.blob.core.windows.net
NODE_ENV = production
REACT_APP_DEBUG = false
```

### **Paso 3: GitHub Actions Workflow**

Azure crea automáticamente workflow en `.github/workflows/`

Para deploy automático:
```bash
git add .
git commit -m "Deploy to Azure"
git push origin master
# ✅ Automáticamente: build + deploy
```

Ver progreso en: https://github.com/YordanSV/RentGamer/actions

---

## Configuración de Imágenes

### **Paso 1: Crear Azure Blob Storage**

[Ver guía completa: GUIA_SETUP_BLOB_STORAGE.md](./GUIA_SETUP_BLOB_STORAGE.md)

**Opción A: Automático (recomendado)**
```powershell
cd scripts
.\setup-blob-storage.ps1
# ✅ Crea Storage Account, Container, sube imágenes
```

**Opción B: Manual en Azure Portal**
1. Crear Storage Account: `rentgamerstorage`
2. Crear Container: `imgGames` (público)
3. Subir 21 imágenes desde `frontend/public/imgGames/`

### **Paso 2: Crear CDN (Opcional pero recomendado)**

```powershell
.\setup-cdn.ps1
# ✅ Crea CDN Profile y Endpoint
# ✅ URLs: https://rentgamer.azureedge.net/imgGames/...
```

### **Paso 3: Actualizar .env en Azure**

```env
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
# O si usas CDN:
REACT_APP_BLOB_STORAGE_URL=https://rentgamer.azureedge.net
```

---

## CI/CD Automático

### **GitHub Actions Workflow**

El archivo `.github/workflows/azure-static-web-app.yml` automatiza:

1. **Build Frontend**: `npm install && npm run build`
2. **Build Backend**: `npm install`
3. **Deploy a Azure**: Sube a Static Web App
4. **Test**: Ejecuta tests si existen

### **Cómo Funciona**

```
Tu PC: git push origin master
  ↓
GitHub: Detecta push a master
  ↓
GitHub Actions: Ejecuta workflow
  - Instala dependencias (frontend + backend)
  - Compila frontend (npm run build)
  - Deploy a Azure Static Web Apps
  ↓
Azure: Actualiza tu sitio en vivo
  ↓
2-3 minutos: Sitio actualizado
```

### **Verificar Deploy**

1. Ir a https://github.com/YordanSV/RentGamer/actions
2. Click en el workflow más reciente
3. Ver logs en tiempo real
4. Status: ✅ (success) o ❌ (failed)

---

## Desplegar Cambios

### **Workflow Simple**

```bash
# 1. Editar código (frontend o backend)
# 2. Commit cambios
git add .
git commit -m "Descripción del cambio"

# 3. Push a master (triggea automáticamente deploy)
git push origin master

# 4. Esperar 2-3 minutos
# 5. Verificar en https://github.com/YordanSV/RentGamer/actions

# 6. Sitio está actualizado en vivo
```

### **Ver Logs de Deploy**

```bash
# Ver último deployment
az staticwebapp show \
  --name rentgamer-frontend \
  --resource-group RentGamer

# Ver build history
# Azure Portal > Static Web App > Build history
```

---

## Monitoreo en Producción

### **Health Check**

```powershell
# Verificar frontend
curl https://rentgamer-frontend.azurestaticapps.net

# Verificar backend
curl https://rentgamer-api.azurewebsites.net/health

# Verificar API
curl https://rentgamer-api.azurewebsites.net/api/games
```

### **Logs**

**Frontend**:
- Azure Portal > Static Web App > Logs

**Backend**:
- Azure Portal > App Service > Log stream

**Database**:
- Azure Portal > SQL Database > Query Editor

### **Performance**

- Frontend: https://web.dev/measure/ (Lighthouse)
- Backend: Azure Monitor > Application Insights
- Database: Query Performance Insights

---

## Troubleshooting

### ❌ "Cannot GET /api/games"

**Causa**: Backend no está corriendo o URL incorrecta

**Solución**:
```bash
# Verificar Backend está en Azure
az webapp show \
  --name rentgamer-api \
  --resource-group RentGamer

# Verificar REACT_APP_API_URL en Azure Portal
# Settings > Configuration > REACT_APP_API_URL
```

### ❌ "CORS error"

**Causa**: Backend no permite Static Web App URL

**Solución**:
1. Editar `backend/src/config/cors.js`
2. Agregar URL de Static Web App
3. Push a master (deploy automático)

```javascript
const corsOptions = {
  origin: [
    'https://rentgamer-frontend.azurestaticapps.net'
  ],
  credentials: true,
};
```

### ❌ GitHub Actions falla

**Ver error**:
1. https://github.com/YordanSV/RentGamer/actions
2. Click en workflow fallido
3. Ver logs de error
4. Errores comunes:
   - npm install falló: Problema con `package.json`
   - npm run build falló: Error de sintaxis en código
   - Deploy falló: Token expirado

### ❌ Imágenes no cargan

**Verificar**:
1. Blob Storage es público: Settings > Container > Public access level = Blob
2. REACT_APP_BLOB_STORAGE_URL correcta en Azure Portal
3. Imágenes existen en Blob: Storage Browser > imgGames

### ❌ Base de Datos no responde

**Verificar**:
1. Azure SQL Server está corriendo
2. Firewall permite conexiones: Settings > Firewalls and virtual networks
3. Credentials correctas en .env
4. Database existe: RentGamerDB

---

## Checklist de Despliegue

- [ ] Frontend compilado sin errores
- [ ] Backend compilado sin errores
- [ ] Variables de entorno configuradas
- [ ] Static Web App creado
- [ ] GitHub Actions workflow automático
- [ ] Push a master = Deploy automático
- [ ] Sitio accesible en URL pública
- [ ] API calls funcionan (DevTools Network)
- [ ] Imágenes cargan desde Blob Storage
- [ ] No hay errores en Console
- [ ] Performance acceptable (Lighthouse)
- [ ] Dominio personalizado (opcional)
- [ ] SSL/HTTPS funciona
- [ ] Monitoreo habilitado

---

## Documentación Adicional

- [GUIA_DESPLIEGUE_AZURE.md](./GUIA_DESPLIEGUE_AZURE.md) - Despliegue detallado
- [GUIA_SETUP_BLOB_STORAGE.md](./GUIA_SETUP_BLOB_STORAGE.md) - Imágenes y CDN
- [frontend/GUIA_CONFIGURACION_FRONTEND.md](./frontend/GUIA_CONFIGURACION_FRONTEND.md) - Frontend
- [backend/README_VARIABLES.md](./backend/README_VARIABLES.md) - Variables backend

---

## Soporte

Para problemas, revisar:
1. Logs de GitHub Actions
2. Azure Portal diagnostics
3. DevTools Console (frontend)
4. Backend logs (Azure App Service)

---

**¡Tu aplicación está lista para producción!** 🚀
```

2. **Configurar variables de entorno:**

Crear `backend/.env`:
```env
MYSQLHOST=127.0.0.1
MYSQLUSER=root
MYSQLPASSWORD=tu_contraseña
MYSQLDATABASE=rentgamer
MYSQLPORT=3306
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. **Ejecutar en desarrollo:**

**Windows (PowerShell):**
```powershell
.\scripts\dev-local.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/dev-local.sh
./scripts/dev-local.sh
```

**O manualmente:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

El proyecto estará disponible en:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

---

## ☁️ Despliegue en Azure

### **Paso 1: Desplegar Frontend (Azure Static Web Apps)**

#### **Opción A: Desde Azure Portal (Recomendado para empezar)**

1. **Crear Static Web App:**
   - Ir a Azure Portal → Crear recurso
   - Buscar "Static Web Apps"
   - Crear nuevo recurso
   - Plan: Free
   - Conectar con GitHub (o usar Azure DevOps)

2. **Configurar:**
   - Source: GitHub
   - Repositorio: tu-repo
   - Branch: main
   - Build presets: React
   - App location: `/frontend`
   - Output location: `build`
   - API location: (dejar vacío)

3. **Obtener URL:**
   - Azure te dará una URL como: `https://tu-app.azurestaticapps.net`
   - Esta URL ya incluye SSL

#### **Opción B: Desde CLI**

```bash
# Instalar Azure CLI si no lo tienes
# Windows: https://aka.ms/installazurecliwindows
# Mac: brew install azure-cli
# Linux: https://docs.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Crear Static Web App
az staticwebapp create \
  --name rentgamer-frontend \
  --resource-group rentgamer-rg \
  --location "East US 2" \
  --source https://github.com/tu-usuario/rentgamer \
  --branch main \
  --app-location "/frontend" \
  --output-location "build"
```

#### **Configurar Dominio Personalizado (Opcional):**

1. En Azure Portal → Static Web App → Custom domains
2. Agregar dominio personalizado
3. Seguir instrucciones para configurar DNS
4. Azure configurará SSL automáticamente

---

### **Paso 2: Desplegar Backend (Azure App Service)**

#### **Crear App Service:**

1. **Desde Azure Portal:**
   - Crear recurso → Web App
   - Nombre: `rentgamer-api`
   - Runtime stack: **Node.js 18 LTS**
   - Operating System: Linux (más económico)
   - Plan: **Free (F1)** o Basic B1

2. **Configurar Variables de Entorno:**
   - Ir a Configuration → Application settings
   - Agregar:
     ```
     MYSQLHOST=tu-host.mysql.database.azure.com
     MYSQLUSER=tu-usuario@tu-host
     MYSQLPASSWORD=tu-contraseña
     MYSQLDATABASE=rentgamer
     MYSQLPORT=3306
     NODE_ENV=production
     PORT=8080
     FRONTEND_URL=https://tu-frontend.azurestaticapps.net
     ```

3. **Desplegar Código:**

   **Opción A: Desde GitHub (Recomendado)**
   - Deployment Center → GitHub
   - Conectar repositorio
   - Branch: main
   - Folder: backend
   - Build command: (dejar vacío, Node.js no necesita build)
   - Start command: `npm start`

   **Opción B: Desde CLI**
   ```bash
   # Instalar Azure Functions Core Tools (opcional)
   npm install -g azure-functions-core-tools@4
   
   # Desplegar
   cd backend
   az webapp up \
     --name rentgamer-api \
     --resource-group rentgamer-rg \
     --runtime "NODE:18-lts"
   ```

   **Opción C: ZIP Deploy**
   ```bash
   cd backend
   zip -r deploy.zip . -x "node_modules/*" ".git/*"
   
   az webapp deployment source config-zip \
     --resource-group rentgamer-rg \
     --name rentgamer-api \
     --src deploy.zip
   ```

4. **Actualizar CORS en Backend:**
   Asegúrate de que `backend/src/config/cors.js` tenga la URL correcta del frontend.

---

### **Paso 3: Configurar Base de Datos**

#### **Opción A: Azure Database for MySQL (Recomendado si ya usas MySQL)**

1. **Crear MySQL Server:**
   - Azure Portal → Crear recurso → Azure Database for MySQL
   - Plan: **Flexible Server** (más económico)
   - Tier: **Burstable B1ms** (1 vCore, 2 GB RAM) - ~$12/mes
   - O usar **Free Tier** si está disponible en tu región

2. **Configurar Firewall:**
   - Agregar regla para permitir Azure services
   - Agregar tu IP para desarrollo

3. **Crear Base de Datos:**
   ```sql
   CREATE DATABASE rentgamer;
   ```

4. **Obtener Connection String:**
   - Host: `tu-server.mysql.database.azure.com`
   - Usuario: `admin@tu-server`
   - Usar en variables de entorno del App Service

#### **Opción B: Azure Cosmos DB (Si migras a NoSQL)**

1. **Crear Cosmos DB:**
   - Azure Portal → Crear recurso → Azure Cosmos DB
   - API: Core (SQL)
   - Plan: **Free Tier** (1000 RU/s + 25 GB gratis)

2. **Migrar código:**
   - Cambiar de MySQL a Cosmos DB SDK
   - Más trabajo pero más económico a largo plazo

---

## 🔧 Configuración Post-Despliegue

### **1. Actualizar Frontend con URL del Backend:**

Crear `frontend/.env.production`:
```env
REACT_APP_API_URL=https://rentgamer-api.azurewebsites.net
```

O actualizar `frontend/src/api/apiClient.js`:
```javascript
baseURL: process.env.REACT_APP_API_URL || 'https://rentgamer-api.azurewebsites.net'
```

### **2. Verificar CORS:**

Asegúrate de que el backend permita requests del frontend:
- En `backend/src/config/cors.js`, la URL del frontend debe estar en la lista de orígenes permitidos.

### **3. Probar Endpoints:**

```bash
# Health check
curl https://rentgamer-api.azurewebsites.net/health

# Obtener juegos
curl https://rentgamer-api.azurewebsites.net/api/games
```

---

## 📊 Monitoreo y Logs

### **Ver Logs del Backend:**
```bash
az webapp log tail --name rentgamer-api --resource-group rentgamer-rg
```

O desde Azure Portal:
- App Service → Log stream

### **Ver Logs del Frontend:**
- Static Web App → Monitoring → Logs

---

## 💰 Estimación de Costos

### **Escenario Gratis (Free Tier):**
- Static Web Apps: **$0**
- App Service (F1): **$0** (con limitaciones)
- MySQL Free Tier: **$0** (si disponible)
- **Total: $0/mes** (solo dominio ~$1/mes)

### **Escenario Básico (Pago):**
- Static Web Apps: **$0**
- App Service Basic B1: **~$13/mes**
- MySQL Flexible B1ms: **~$12/mes**
- **Total: ~$25/mes**

---

## 🐛 Troubleshooting

### **Backend no inicia:**
- Verificar variables de entorno en Azure Portal
- Revisar logs: `az webapp log tail`
- Verificar que `package.json` tenga `"start": "node src/server.js"`

### **CORS errors:**
- Verificar que `FRONTEND_URL` en backend apunte a la URL correcta
- Verificar configuración en `backend/src/config/cors.js`

### **Base de datos no conecta:**
- Verificar firewall de MySQL permite Azure services
- Verificar connection string en variables de entorno
- Verificar que el usuario tenga formato correcto: `usuario@servidor`

### **Frontend no carga:**
- Verificar que el build se completó correctamente
- Verificar `staticwebapp.config.json`
- Revisar logs en Azure Portal

---

## 📚 Recursos Adicionales

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)
- [Azure Database for MySQL](https://docs.microsoft.com/azure/mysql/)
- [Azure Free Account](https://azure.microsoft.com/free/)

---

## ✅ Checklist de Despliegue

- [ ] Crear cuenta de Azure (con free tier)
- [ ] Crear Static Web App para frontend
- [ ] Configurar GitHub Actions (automático)
- [ ] Crear App Service para backend
- [ ] Configurar variables de entorno del backend
- [ ] Crear base de datos MySQL
- [ ] Configurar firewall de MySQL
- [ ] Actualizar CORS en backend
- [ ] Actualizar URL de API en frontend
- [ ] Probar endpoints
- [ ] Configurar dominio personalizado (opcional)
- [ ] Configurar SSL (automático en Static Web Apps)

---

**Última actualización:** $(date)


