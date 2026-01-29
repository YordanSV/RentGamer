# Guía Completa: Despliegue a Azure Static Web Apps

## 📋 Índice
1. [Prerrequisitos](#prerrequisitos)
2. [Crear Static Web App](#crear-static-web-app)
3. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
4. [GitHub Actions Workflow](#github-actions-workflow)
5. [Despliegue Manual](#despliegue-manual)
6. [Verificar Funcionamiento](#verificar-funcionamiento)
7. [Dominios Personalizados](#dominios-personalizados)
8. [Troubleshooting](#troubleshooting)

---

## Prerrequisitos

Antes de comenzar, necesitas:

✅ Repositorio en GitHub (https://github.com/YordanSV/RentGamer)
✅ Azure Subscription activa
✅ Azure CLI instalado (o acceso a Azure Portal)
✅ Resource Group `RentGamer` creado
✅ Backend App Service configurado
✅ Azure Blob Storage configurado (imágenes)
✅ Frontend y Backend listos para producción

---

## Crear Static Web App

### Opción A: Azure Portal (Visual)

#### 1. Ir a Azure Portal
https://portal.azure.com

#### 2. Crear Static Web App
1. Busca "Static Web Apps" en barra superior
2. Click en "Create" o "+ New"
3. Rellena los campos:

**Basics**:
- **Subscription**: Tu suscripción
- **Resource group**: `RentGamer`
- **Name**: `rentgamer-frontend`
- **Plan type**: `Free`
- **Region**: `East US 2`
- **Source**: GitHub

**Repository Details**:
- Click en "Sign in with GitHub"
- Selecciona: `YordanSV/RentGamer`
- **Branch**: `master`
- **Build Presets**: `React`

**Build Details**:
- **App location**: `frontend`
- **Api location**: `backend` (dejar vacío si no lo deseas)
- **Output location**: `build`

4. Click en "Review + create" → "Create"

#### 3. Autorizar GitHub (Pop-up)
- GitHub pedirá permiso para crear workflow
- Click en "Authorize"

#### 4. Esperar creación
- Toma ~2-3 minutos
- Azure crea automáticamente GitHub Actions workflow

### Opción B: Azure CLI (más rápido)

```powershell
# Instalar extensión de Static Web Apps
az extension add --name staticwebapp

# Crear Static Web App
az staticwebapp create `
  --name rentgamer-frontend `
  --resource-group RentGamer `
  --source https://github.com/YordanSV/RentGamer `
  --location eastus2 `
  --branch master `
  --build-folder frontend `
  --output-location build

# Resultado: URL de tu sitio (ej: https://graceful-beach-abc123.azurestaticapps.net)
```

---

## Configurar Variables de Entorno

### En Azure Portal

1. Ve a tu Static Web App (`rentgamer-frontend`)
2. Click en **Settings** en menú izquierdo
3. Click en **Configuration**
4. Agrega estas variables (click en "+ Add"):

**Variables necesarias**:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://rentgamer-api.azurewebsites.net` |
| `REACT_APP_BLOB_STORAGE_URL` | `https://rentgamerstorage.blob.core.windows.net` |
| `REACT_APP_CDN_URL` | `https://rentgamer.azureedge.net` (opcional) |
| `REACT_APP_NAME` | `RentGamer` |
| `REACT_APP_VERSION` | `1.0.0` |
| `NODE_ENV` | `production` |
| `REACT_APP_DEBUG` | `false` |

5. Click en **Save**

⚠️ **IMPORTANTE**: Cambios en configuración requieren rebuild.
```bash
# Forzar rebuild:
git commit --allow-empty -m "Trigger rebuild"
git push
```

---

## GitHub Actions Workflow

### Archivo generado automáticamente

Azure crea automáticamente `.github/workflows/azure-static-web-apps-*.yml`

Si no se crea automáticamente, crea manualmente:

### archivo: `.github/workflows/azure-static-web-app.yml`

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - master
  pull_request:
    types: [opened, synchronize, reopened]
    branches:
      - master

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Setup Node.js environment
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'

      - name: Build Frontend
        working-directory: ./frontend
        run: |
          npm install
          npm run build

      - name: Deploy to Azure Static Web Apps
        id: deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          app_location: 'frontend'
          api_location: 'backend'
          output_location: 'build'
          app_build_command: 'npm run build'
          skip_app_build: false
```

### Cómo Azure obtiene el token

1. Azure Portal crea automáticamente Secret en GitHub:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`
2. Este secret se configura en GitHub Actions
3. No necesitas configurarlo manualmente

### Verificar workflow

En tu repositorio GitHub:
1. Ve a **Actions** 
2. Debe ver workflow corriendo
3. Si falla, click para ver logs

---

## Despliegue Manual

### Opción A: GitHub (recomendado)

```bash
# 1. Commit cambios
cd RentGamer
git add .
git commit -m "Frontend production ready"

# 2. Push a master (triggea automáticamente Azure deploy)
git push origin master

# 3. Ver progreso en GitHub Actions
# https://github.com/YordanSV/RentGamer/actions
```

### Opción B: Azure Static Web Apps CLI

```powershell
# Instalar Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy manual
swa deploy `
  --deployment-token ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }} `
  --env production
```

### Opción C: Azure CLI

```powershell
# Deploy frontend
az staticwebapp create `
  --name rentgamer-frontend `
  --resource-group RentGamer `
  --source "C:\Users\yorda\OneDrive\Documents\RentGamer" `
  --branch master `
  --build-folder frontend `
  --output-location build
```

---

## Verificar Funcionamiento

### 1. Obtener URL de tu sitio

```powershell
az staticwebapp show `
  --name rentgamer-frontend `
  --resource-group RentGamer `
  --query defaultHostname -o tsv

# Resultado: https://graceful-beach-abc123.azurestaticapps.net
```

### 2. Verificar en navegador

1. Ve a tu URL
2. Navega a Shop
3. Verifica que:
   - ✅ Juegos cargan (request a `/api/games`)
   - ✅ Imágenes se cargan desde Blob Storage
   - ✅ No hay errores en Console

### 3. Verificar en DevTools

```javascript
// Console:
[API Client] Usando API URL: https://rentgamer-api.azurewebsites.net

// Network tab:
// GET https://rentgamer-api.azurewebsites.net/api/games → 200 OK
// GET https://rentgamerstorage.blob.core.windows.net/img-games/action1.png → 200 OK
```

### 4. Verificar Build Logs

En Azure Portal > Static Web App > Build:
- Click en el build más reciente
- Ver logs de build y deploy

---

## Dominios Personalizados (Opcional)

### Agregar dominio personalizado

1. Ve a Static Web App > Settings
2. Click en **Custom domains**
3. Click en **+ Add**
4. Ingresa tu dominio (ej: `rentgamer.com`)
5. Verificar propiedad del dominio (DNS)
6. Esperar validación (15-30 minutos)

### Configurar DNS

Opciones:
1. **Si tu proveedor es Azure DNS**:
   ```powershell
   # Azure configura automáticamente
   ```

2. **Si tienes proveedor externo (GoDaddy, Namecheap, etc.)**:
   - Copiar nombre CNAME que Azure proporciona
   - Ir a proveedor DNS
   - Crear record CNAME apuntando a Azure
   - Ejemplo: `rentgamer.com` → `graceful-beach-abc123.azurestaticapps.net`

---

## Configurar HTTPS (Automático)

✅ **Azure Static Web Apps incluye HTTPS gratis**
- Certificado automático Let's Encrypt
- Se renueva automáticamente
- Dominio principal y personalizados cubiertos

---

## Monitoreo y Analytics

### Habilitar Application Insights

1. Ve a Static Web App > Settings
2. Click en **Monitoring**
3. Click en **Configure**
4. Selecciona Application Insights o crea nuevo
5. Click en **Save**

### Ver métricas

1. Ve a Application Insights
2. Dashboard muestra:
   - Requests por segundo
   - Errores
   - Performance
   - Excepciones

---

## Actualizar tu aplicación

### Cuando haces cambios

```bash
# 1. Editar código
# 2. Commit
git add .
git commit -m "Descripción del cambio"

# 3. Push a master
git push origin master

# ✅ Azure automáticamente:
# - Detecta cambios
# - Ejecuta GitHub Actions workflow
# - Build frontend (npm install, npm run build)
# - Deploy a Static Web App
# - Sitio se actualiza en ~2 minutos
```

### Monitorear deploy

En GitHub:
1. Ve a **Actions**
2. Click en el workflow más reciente
3. Ver logs en tiempo real
4. Ver cuándo termina "Deployed successfully"

---

## Variables de Entorno por Ambiente

### Development (Local)
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_BLOB_STORAGE_URL=http://localhost:3000
REACT_APP_DEBUG=true
NODE_ENV=development
```

### Staging (Azure)
```env
REACT_APP_API_URL=https://rentgamer-api-staging.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
REACT_APP_DEBUG=true
NODE_ENV=staging
```

### Production (Azure)
```env
REACT_APP_API_URL=https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL=https://rentgamer.azureedge.net
REACT_APP_DEBUG=false
NODE_ENV=production
```

---

## CORS Configuration (Backend)

Asegúrate que tu backend permite requests desde Static Web App:

### Backend: `src/config/cors.js`

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://rentgamer-frontend.azurestaticapps.net',
    // Agregar tu dominio personalizado:
    'https://rentgamer.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
```

### Backend: `.env`

```env
FRONTEND_URL=https://rentgamer-frontend.azurestaticapps.net
```

---

## Troubleshooting

### ❌ "Cannot GET /api/games" (Error 404)

**Causa**: Backend no está corriendo o URL es incorrecta

**Solución**:
1. Verificar que Backend App Service está corriendo
2. Verificar `REACT_APP_API_URL` en Azure Portal
3. Verificar CORS en backend permite Static Web App URL

### ❌ "CORS error"

**Causa**: Backend no permite Static Web App URL

**Solución**:
```bash
# Actualizar backend CORS
# src/config/cors.js agregar tu Static Web App URL

git add src/config/cors.js
git commit -m "Update CORS for Static Web App"
git push
```

### ❌ Imágenes no cargan

**Causa**: Blob Storage URL incorrecta

**Solución**:
1. Verificar `REACT_APP_BLOB_STORAGE_URL` en Azure Portal
2. Verificar que Blob Storage es público
3. Probar URL en navegador: `https://rentgamerstorage.blob.core.windows.net/img-games/action1.png`

### ❌ Build falla

**Ver logs**:
1. GitHub Actions > Click en workflow
2. Click en "Build and Deploy Job"
3. Ver en qué paso falla
4. Errores comunes:
   - Dependencies no instaladas: `npm install` falló
   - Build falla: `npm run build` tiene errores
   - Secrets no configuradas

### ❌ Sitio devuelve 404

**Causa**: SPA routing no configurado

**Solución**:
- Verificar `staticwebapp.config.json` tiene fallback a index.html
- Debe ser:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*", "/static/*", "/api/*"]
  }
}
```

---

## Costos Estimados

| Servicio | Costo |
|----------|-------|
| **Static Web App** | FREE (hasta 1 GB storage, 100 GB bandwidth) |
| **App Service (Backend)** | $13/mes (Standard) |
| **Blob Storage** | $0.60/mes |
| **CDN** | $0/mes (primeros 200 GB) |
| **Total** | ~$14/mes |

---

## Próximas Acciones

1. ✅ Crear Static Web App
2. ✅ Configurar variables de entorno
3. ✅ GitHub Actions workflow automático
4. ✅ Desplegar (git push origin master)
5. ✅ Verificar funcionamiento
6. ✅ (Opcional) Configurar dominio personalizado
7. ✅ (Opcional) Habilitar Application Insights

---

## Checklist Final

- [ ] Static Web App creado en Azure
- [ ] Variables de entorno configuradas
- [ ] GitHub Actions workflow funcionando
- [ ] Push a master triggea deploy
- [ ] Frontend accesible en URL pública
- [ ] API calls funcionan (DevTools Network)
- [ ] Imágenes cargan desde Blob Storage
- [ ] No hay errores en Console
- [ ] Performance aceptable (Lighthouse)
- [ ] CORS configurado correctamente

---

**¡Despliegue completado!** 🎉

Tu aplicación está en vivo en:
```
https://rentgamer-frontend.azurestaticapps.net
```

O tu dominio personalizado si lo configuraste.
