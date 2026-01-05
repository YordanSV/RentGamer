# 🚀 Guía de Despliegue - RentGamer

Esta guía te ayudará a desplegar RentGamer en Azure de forma gratuita o con costos mínimos.

---

## 📋 Arquitectura Recomendada

### **Opción 1: Gratis (Free Tier)**

- **Frontend (React)**: Azure Static Web Apps - **GRATIS**
  - Hosting + SSL + CDN incluido
  - 100 GB de ancho de banda/mes gratis
  
- **Backend (API)**: Azure App Service - **Free Tier (F1)**
  - 1 GB de RAM
  - 1 GB de almacenamiento
  - 60 minutos de CPU/día
  - **Ideal para demos y pocos usuarios**

- **Base de Datos**: 
  - **Opción A**: Azure Database for MySQL - **Free Tier**
    - 32 GB de almacenamiento
    - 750 horas/mes gratis
  - **Opción B**: Azure Cosmos DB - **Free Tier** (si migras a NoSQL)
    - 1000 RU/s + 25 GB gratis de por vida

- **Dominio**: Comprar aparte (Namecheap, GoDaddy, etc.) - ~$10-15/año

**Costo Total: Solo el dominio (~$1/mes)**

---

## 🏃 Ejecución Local

### **Requisitos Previos:**
- Node.js 18+ instalado
- npm instalado
- MySQL instalado (para desarrollo local)

### **Instalación:**

1. **Instalar dependencias:**
```bash
# Opción 1: Desde la raíz del proyecto
npm run install:all

# Opción 2: Manualmente
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
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


