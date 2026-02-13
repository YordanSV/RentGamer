# 🚀 Configuración Completa de Azure para RentGamer

## 📋 Resumen de Recursos Azure

Según tu captura, tienes estos recursos:
1. **ASP-rentgamerapigroup-bf74** - App Service Plan
2. **RentGamer** - Static Web App (Frontend)
3. **rentgamer-api** - App Service (Backend)
4. **rentgamer-sql** - SQL Server
5. **RentGamerDB** - Base de datos SQL
6. **rentgamerstorage** - Storage Account (para imágenes)

---

## 1️⃣ SQL Server: `rentgamer-sql`

### En Azure Portal:
1. **SQL Server** → `rentgamer-sql` → Settings
2. **Firewalls and virtual networks**:
   - ✅ Activar "Allow Azure services and resources to access this server"
   - Agregar tu IP actual para acceso desde tu PC

### Obtener datos de conexión:
```
Server: rentgamer-sql.database.windows.net
Base de datos: RentGamerDB
Usuario: [tu_admin_user] (lo creaste al configurar el servidor)
Contraseña: [tu_contraseña]
Puerto: 1433
```

### ⚠️ Importante:
- SQL Server requiere `encrypt: true`
- La cadena de conexión debe usar formato Azure

---

## 2️⃣ Base de Datos: `RentGamerDB`

### Ejecutar el Schema:
Desde tu PC (con SQL Server Management Studio o Azure Data Studio):

```sql
-- Conectar a: rentgamer-sql.database.windows.net
-- Base de datos: RentGamerDB

-- Ejecutar en orden:
1. database/schema.sql (crear tablas)
2. database/seed-data.sql (datos iniciales)
```

### Verificar tablas creadas:
```sql
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE';

-- Deberías ver:
-- Categories
-- Games
```

---

## 3️⃣ Storage Account: `rentgamerstorage`

### Configuración:
1. **Storage Account** → `rentgamerstorage` → Containers
2. **Crear container** (si no existe):
   - Nombre: `imggames` o `img-games`
   - Public access level: **Blob** (permitir lectura anónima)

### Subir imágenes:
1. Ir al container `imggames`
2. Upload → Seleccionar archivos de `frontend/public/img-games/`
3. Subir TODAS las imágenes de juegos

### URL de acceso:
```
https://rentgamerstorage.blob.core.windows.net/imggames/action1.png
```

### Habilitar CORS (importante):
**Storage Account** → Settings → Resource sharing (CORS):
```
Allowed origins: *
Allowed methods: GET, HEAD, OPTIONS
Allowed headers: *
Exposed headers: *
Max age: 86400
```

---

## 4️⃣ App Service (Backend): `rentgamer-api`

### Variables de Entorno (Application Settings):

**App Service** → `rentgamer-api` → Configuration → Application settings:

```env
# Base de Datos
DB_SERVER=rentgamer-sql.database.windows.net
DB_NAME=RentGamerDB
DB_USER=tu_admin_user
DB_PASSWORD=tu_contraseña_segura
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_CERT=false

# Servidor
PORT=8080
NODE_ENV=production

# CORS - URL del frontend
FRONTEND_URL=https://gentle-beach-02b34a00f.6.azurestaticapps.net

# Storage (opcional, si el backend maneja imágenes)
BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
```

### Configuración General:
- **Stack settings**:
  - Runtime stack: Node
  - Node version: 18 LTS (o 20 LTS)
  
- **General settings**:
  - Always On: ✅ ON (para mantener la app activa)
  - HTTP version: 2.0

### Desplegar código:
Opción 1 - Desde VS Code con Azure Extension:
```
1. Instalar extensión "Azure App Service"
2. Click derecho en carpeta backend/
3. "Deploy to Web App..."
4. Seleccionar rentgamer-api
```

Opción 2 - Desde terminal (con Azure CLI):
```powershell
cd backend
az webapp up --name rentgamer-api --resource-group RentGamer_group
```

### ⚠️ Archivo importante: `web.config`
Ya tienes un `web.config` en backend/. Debe incluir:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="src/server.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^src/server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="src/server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
```

---

## 5️⃣ Static Web App (Frontend): `RentGamer`

### Variables de Entorno:

**Static Web App** → `RentGamer` → Configuration → Environment Variables:

```env
REACT_APP_API_URL=https://rentgamer-api.azurewebsites.net
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
NODE_ENV=production
```

### Desplegar:
Opción 1 - GitHub Actions (recomendado):
La Static Web App ya tiene un workflow en `.github/workflows/`. Al hacer push a master, se despliega automáticamente.

Opción 2 - Manual con Azure CLI:
```powershell
cd frontend
npm run build
az staticwebapp upload --app-name RentGamer --resource-group RentGamer_group --source ./build
```

### Archivo de configuración: `staticwebapp.config.json`
Debe estar en `frontend/build/` y `frontend/`:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/static/*", "/img-games/*"]
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    }
  ],
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  }
}
```

---

## 📝 Cambios en el Código

### Backend: `backend/src/config/database.js`
✅ Ya está bien configurado, solo asegúrate que tenga:
```javascript
options: {
  encrypt: true, // Importante para Azure
  trustServerCertificate: false,
  enableArithAbort: true,
}
```

### Backend: `backend/src/config/cors.js`
✅ Ya está configurado. Actualiza si necesitas:
```javascript
const allowedOrigins = [
  'https://gentle-beach-02b34a00f.6.azurestaticapps.net', // Tu Static Web App
  'https://rentgamer.netlify.app', // Si usas Netlify
  process.env.FRONTEND_URL,
].filter(Boolean);
```

### Frontend: `frontend/src/config/apiConfig.js`
Actualizar la URL de producción:
```javascript
production: {
  apiUrl: process.env.REACT_APP_API_URL || 'https://rentgamer-api.azurewebsites.net',
  blobStorageUrl: process.env.REACT_APP_BLOB_STORAGE_URL || 'https://rentgamerstorage.blob.core.windows.net',
  timeout: 15000,
  debug: false,
},
```

### Frontend: Rutas de imágenes
En los componentes que usan imágenes:
```javascript
// Antes (local):
<img src="/img-games/action1.png" />

// Después (Azure):
<img src="https://rentgamerstorage.blob.core.windows.net/imggames/action1.png" />

// O usando la función helper:
import { getImageUrl } from '../config/apiConfig';
<img src={getImageUrl('action1.png')} />
```

---

## 🔄 Proceso de Despliegue Completo

### 1. Primera vez (Setup):
```powershell
# 1. Configurar SQL
# Ejecutar schema.sql y seed-data.sql en Azure SQL

# 2. Subir imágenes
# Subir manualmente a Storage Account o usar script

# 3. Configurar variables en App Service
az webapp config appsettings set --name rentgamer-api --resource-group RentGamer_group --settings @backend-config.json

# 4. Configurar variables en Static Web App
# Hacerlo desde el portal de Azure
```

### 2. Despliegues posteriores:

**Backend:**
```powershell
cd backend
npm install --production
az webapp deployment source config-zip --resource-group RentGamer_group --name rentgamer-api --src backend.zip
```

**Frontend:**
```powershell
cd frontend
npm run build
# Git push (si usas GitHub Actions) o manual upload
```

---

## ✅ Verificación

### 1. Backend funcionando:
```
https://rentgamer-api.azurewebsites.net/api/games
```
Debe devolver JSON con los juegos

### 2. Frontend funcionando:
```
https://gentle-beach-02b34a00f.6.azurestaticapps.net
```
Debe cargar la página con imágenes

### 3. Imágenes funcionando:
```
https://rentgamerstorage.blob.core.windows.net/imggames/action1.png
```
Debe mostrar la imagen

---

## 🐛 Solución de Problemas

### Backend no conecta a BD:
- Verificar firewall de SQL Server
- Verificar variables de entorno (DB_SERVER, DB_USER, etc.)
- Logs: App Service → Monitoring → Log stream

### CORS errors:
- Verificar FRONTEND_URL en App Service
- Verificar allowedOrigins en cors.js
- Verificar CORS en Storage Account

### Imágenes no cargan:
- Verificar que el container es público (Blob access)
- Verificar CORS en Storage Account
- Verificar rutas en código (con https://)

### App Service se duerme:
- Activar "Always On" en Configuration → General settings

---

## 📞 Comandos Útiles

```powershell
# Ver logs del backend
az webapp log tail --name rentgamer-api --resource-group RentGamer_group

# Reiniciar App Service
az webapp restart --name rentgamer-api --resource-group RentGamer_group

# Ver variables de entorno configuradas
az webapp config appsettings list --name rentgamer-api --resource-group RentGamer_group

# Test conexión a SQL
az sql db show-connection-string --server rentgamer-sql --name RentGamerDB --client ado.net
```

---

## 🎯 Checklist Final

- [ ] SQL Server firewall configurado
- [ ] Schema y datos cargados en RentGamerDB
- [ ] Imágenes subidas a Storage Account
- [ ] Container imggames es público
- [ ] CORS configurado en Storage
- [ ] Variables de entorno en rentgamer-api
- [ ] Always On activado en rentgamer-api
- [ ] Código backend desplegado
- [ ] Variables de entorno en RentGamer Static App
- [ ] Código frontend desplegado (build)
- [ ] staticwebapp.config.json en build/
- [ ] URLs actualizadas en código
- [ ] Test: API responde
- [ ] Test: Frontend carga
- [ ] Test: Imágenes funcionan

---

**¡Con esto tu proyecto debería estar completamente funcional en Azure!** 🎉
