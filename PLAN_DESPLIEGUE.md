# 🎯 PLAN DE DESPLIEGUE COMPLETO - RENTGAMER

**Estado**: ✅ Listo para implementar  
**Tiempo estimado**: 30-45 minutos  
**Dificultad**: Fácil (pasos automatizados)

---

## 📊 Resumen Ejecutivo

Completamos la configuración total de RentGamer con:
- ✅ Frontend configurado (React)
- ✅ Backend configurado (Node.js)
- ✅ Base de datos Azure SQL
- ✅ Documentación completa
- ✅ Scripts de despliegue

**Próximos pasos**: Desplegar a Azure en 3 fases

---

## 🎬 FASE 1: Azure Blob Storage (15 minutos)

### Paso 1: Subir imágenes automáticamente

```powershell
# 1. Abre PowerShell como Administrador
# 2. Ve a la carpeta del proyecto
cd "C:\Users\yorda\OneDrive\Documents\RentGamer"

# 3. Ejecuta el script (automático)
.\scripts\setup-blob-storage.ps1

# ✅ Resultado:
# - Crea Storage Account "rentgamerstorage"
# - Crea Container "img-games"
# - Sube 21 imágenes de juegos
```

**Alternativa Manual** (si el script falla):
1. Ir a https://portal.azure.com
2. Buscar "Storage accounts"
3. Crear: `rentgamerstorage`
4. Container: `img-games` (público)
5. Subir archivos desde `frontend/public/imgGames/`

### Paso 2: (Opcional) Configurar CDN para imágenes más rápidas

```powershell
# Ejecuta el script CDN
.\scripts\setup-cdn.ps1

# ✅ Resultado:
# - Crea CDN Profile
# - Endpoint con URL: https://rentgamer.azureedge.net
# - 10x más rápido que Blob Storage directo
```

### Copiar URLs para .env

Después de ejecutar los scripts, copia la URL:
```env
# Sin CDN (más lento pero funciona):
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net

# Con CDN (recomendado - 10x más rápido):
REACT_APP_BLOB_STORAGE_URL=https://rentgamer.azureedge.net
```

---

## 🚀 FASE 2: Desplegar Frontend a Azure Static Web Apps (10 minutos)

### Paso 1: Crear Static Web App

**Opción A: Azure Portal (más fácil)**
1. Ve a https://portal.azure.com
2. Busca "Static Web Apps"
3. Click "Create"
4. Rellena:
   - Name: `rentgamer-frontend`
   - Region: `East US 2`
   - Source: GitHub
   - Repo: `YordanSV/RentGamer`
   - Branch: `master`
   - Build Presets: `React`
   - App location: `frontend`
   - Output location: `build`

**Opción B: Azure CLI (más rápido)**
```powershell
az extension add --name staticwebapp

az staticwebapp create `
  --name rentgamer-frontend `
  --resource-group RentGamer `
  --source https://github.com/YordanSV/RentGamer `
  --location eastus2 `
  --branch master `
  --build-folder frontend `
  --output-location build
```

✅ **Resultado**: URL pública (ej: `https://graceful-beach-abc123.azurestaticapps.net`)

### Paso 2: Configurar variables de entorno

En Azure Portal > Static Web App > Settings > Configuration:

Haz click en "+ Add" para cada variable:

```
REACT_APP_API_URL = https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL = https://rentgamerstorage.blob.core.windows.net
REACT_APP_NAME = RentGamer
REACT_APP_VERSION = 1.0.0
NODE_ENV = production
REACT_APP_DEBUG = false
```

Click en "Save"

### Paso 3: GitHub Actions Workflow (Automático)

✅ Azure crea automáticamente el workflow en `.github/workflows/`

No necesitas hacer nada. Cada vez que hagas push a master:
```bash
git add .
git commit -m "Cambios"
git push origin master
# ✅ Automáticamente: Build + Deploy en ~2 minutos
```

Ver progreso:
- GitHub: https://github.com/YordanSV/RentGamer/actions
- Azure Portal: Static Web App > Build history

---

## 🔐 FASE 3: Verificación Final (5 minutos)

### Paso 1: Verificar Frontend

```bash
# Obtener URL pública
az staticwebapp show `
  --name rentgamer-frontend `
  --resource-group RentGamer `
  --query defaultHostname -o tsv

# Resultado: https://graceful-beach-abc123.azurestaticapps.net
```

1. Abre URL en navegador
2. Navega a Shop
3. Verifica:
   - ✅ Página carga
   - ✅ Juegos se cargan
   - ✅ Imágenes se ven
   - ✅ Sin errores en Console

### Paso 2: Verificar DevTools

En navegador (F12 > Console y Network):

```javascript
// Console debe mostrar:
[API Client] Usando API URL: https://rentgamer-api.azurewebsites.net

// Network tab must show:
GET https://rentgamer-api.azurewebsites.net/api/games → 200 OK
GET https://rentgamerstorage.blob.core.windows.net/img-games/action1.png → 200 OK
```

### Paso 3: Verificar Performance

https://web.dev/measure/ (Lighthouse):
- ✅ Carga en < 3 segundos
- ✅ Lighthouse score > 90
- ✅ Sin errores

---

## 📋 CHECKLIST FINAL

### Blob Storage
- [ ] Script `setup-blob-storage.ps1` ejecutado
- [ ] 21 imágenes subidas
- [ ] URL de Blob Storage obtenida

### Static Web App
- [ ] Static Web App creado
- [ ] Variables de entorno configuradas
- [ ] GitHub Actions workflow funciona

### Verificación
- [ ] Frontend accesible en URL pública
- [ ] Juegos cargan desde API
- [ ] Imágenes cargan desde Blob Storage
- [ ] No hay errores en Console
- [ ] DevTools Network muestra 200 OK

### Automatización
- [ ] Push a master = Deploy automático
- [ ] GitHub Actions muestra "success"
- [ ] Cambios reflejados en ~2 minutos

---

## 🎯 FLUJO FINAL

```
Local Development:
cd frontend && npm start
cd backend && npm start
  ↓
Cambios listos:
git add .
git commit -m "Ready for production"
git push origin master
  ↓
GitHub Actions automáticamente:
- Instala dependencias (frontend + backend)
- Compila frontend (npm run build)
- Deploy a Azure Static Web Apps
  ↓
~2 minutos después:
Tu sitio está en vivo en:
https://rentgamer-frontend.azurestaticapps.net
  ↓
Usuarios pueden acceder:
- Shop con juegos
- Imágenes desde Blob Storage
- API calls funcionan
```

---

## 📚 Documentación Disponible

| Archivo | Propósito |
|---------|-----------|
| [GUIA_SETUP_BLOB_STORAGE.md](./GUIA_SETUP_BLOB_STORAGE.md) | Detallado: Blob Storage + CDN |
| [GUIA_DESPLIEGUE_AZURE.md](./GUIA_DESPLIEGUE_AZURE.md) | Detallado: Static Web Apps |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Resumen: Todo de un vistazo |
| [scripts/setup-blob-storage.ps1](./scripts/setup-blob-storage.ps1) | Script automático: Imágenes |
| [scripts/setup-cdn.ps1](./scripts/setup-cdn.ps1) | Script automático: CDN |
| [.github/workflows/azure-static-web-app.yml](./.github/workflows/azure-static-web-app.yml) | GitHub Actions: CI/CD |

---

## 🚨 Si algo falla

### Blob Storage
- Ver: [GUIA_SETUP_BLOB_STORAGE.md - Troubleshooting](./GUIA_SETUP_BLOB_STORAGE.md#troubleshooting)

### Static Web Apps
- Ver: [GUIA_DESPLIEGUE_AZURE.md - Troubleshooting](./GUIA_DESPLIEGUE_AZURE.md#troubleshooting)

### GitHub Actions
- GitHub: Actions > Workflow fallido > Ver logs
- Errores comunes: npm install falló, build falló, deploy falló

### General
- DevTools Console (F12): Buscar errores de JavaScript
- Network tab (F12): Buscar requests fallidas (4xx, 5xx)
- Azure Portal: Logs de Static Web App y App Service

---

## 💰 Costos Finales

| Servicio | Costo/mes |
|----------|-----------|
| Frontend (Static Web Apps) | $0 |
| Backend (App Service Standard) | $13 |
| Database (Azure SQL Standard) | $15-30 |
| Storage + CDN | $0.60 |
| **TOTAL** | **~$29-44/mes** |

⭐ Gratis vs. típico hosting: **$300+/mes**

---

## ✨ RESUMEN

```
✅ Frontend completamente configurado
✅ Backend completamente configurado
✅ Base de datos Azure SQL lista
✅ Imágenes en Blob Storage listas
✅ GitHub Actions workflow listo
✅ Documentación completa
✅ Scripts automatizados listos

🎯 Próximo: Ejecutar 3 comandos (fases de arriba)
⏱️  Tiempo total: 30-45 minutos
🚀 Resultado: Aplicación en vivo
```

---

## 🎬 Iniciar Ahora

```powershell
# 1. Abre PowerShell como Administrador

# 2. Ejecuta script Blob Storage
cd "C:\Users\yorda\OneDrive\Documents\RentGamer\scripts"
.\setup-blob-storage.ps1

# 3. Copia la URL mostrada

# 4. Ve a Azure Portal para crear Static Web App

# 5. Configura variables de entorno

# ✅ ¡Listo! Tu app estará en vivo en ~5-10 minutos
```

---

**¡Estás a 30 minutos de tener tu app en producción!** 🚀

Cualquier duda, revisar las guías detalladas en el proyecto.
