# 📋 Resumen de Configuración - RentGamer

## ✅ Lo que se ha configurado

### 🏠 **Ejecución Local**

#### Scripts Creados:
- ✅ `scripts/dev-local.sh` - Script para Linux/Mac
- ✅ `scripts/dev-local.ps1` - Script para Windows PowerShell
- ✅ `scripts/build.sh` / `scripts/build.ps1` - Scripts de build
- ✅ `package.json` raíz con comandos unificados

#### Comandos Disponibles:
```bash
npm run install:all      # Instalar todas las dependencias
npm run dev              # Ejecutar backend + frontend juntos
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend
npm run build            # Build del frontend
```

---

### ☁️ **Configuración para Azure**

#### Frontend (Azure Static Web Apps):
- ✅ `frontend/staticwebapp.config.json` - Configuración de rutas y redirecciones
- ✅ `.github/workflows/azure-static-web-apps.yml` - CI/CD automático
- ✅ Configurado para deploy automático desde GitHub

#### Backend (Azure App Service):
- ✅ `backend/.deployment` - Configuración de deployment
- ✅ `backend/web.config` - Config para Windows (opcional)
- ✅ `backend/azure-app-service-config.md` - Guía de configuración
- ✅ `backend/src/server.js` - Ya configurado para usar PORT de Azure

#### Documentación:
- ✅ `DEPLOYMENT.md` - Guía completa de despliegue
- ✅ `QUICK_START.md` - Inicio rápido
- ✅ `README.md` - Actualizado con nueva estructura

---

## 🎯 Arquitectura Recomendada

### **Opción Gratis (Free Tier):**

```
┌─────────────────────────────────────────┐
│  Frontend (React)                       │
│  Azure Static Web Apps                  │
│  ✅ GRATIS                               │
│  ✅ SSL incluido                        │
│  ✅ CDN incluido                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Backend (Node.js/Express)              │
│  Azure App Service - Free Tier (F1)     │
│  ✅ GRATIS (con limitaciones)           │
│  ✅ 60 min CPU/día                      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Base de Datos                          │
│  Azure SQL Database - Free Tier         │
│  ✅ GRATIS (si disponible)             │
│  O Azure SQL Database Basic (~$5/mes)  │
└─────────────────────────────────────────┘
```

**Costo Total: $0/mes** (solo dominio opcional ~$1/mes)

---

## 📝 Pasos Siguientes

### Para Desarrollo Local:

1. **Instalar dependencias:**
   ```bash
   npm run install:all
   ```

2. **Configurar `.env` en backend:**
   
   Copiar `backend/.env.example` a `backend/.env` y completar:
   ```env
   # Base de Datos
   DB_SERVER=localhost
   DB_NAME=RentGamer
   DB_USER=sa
   DB_PASSWORD=tu_contraseña
   DB_PORT=1433
   DB_ENCRYPT=false
   DB_TRUST_CERT=false
   
   # Servidor
   PORT=3001
   NODE_ENV=development
   
   # CORS
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Ver `backend/VARIABLES_ENTORNO.md` para más detalles**

3. **Ejecutar:**
   ```bash
   # Windows
   .\scripts\dev-local.ps1
   
   # Linux/Mac
   ./scripts/dev-local.sh
   ```

### Para Desplegar en Azure:

**Ver la sección completa "📋 Guía Paso a Paso para Azure" más abajo**

---

## 🔧 Archivos Importantes

### Configuración:
- `package.json` (raíz) - Scripts unificados
- `backend/.env` - Variables de entorno (crear basado en ejemplo)
- `frontend/.env` - Variables de entorno del frontend (opcional)

### Azure:
- `frontend/staticwebapp.config.json` - Config Static Web Apps
- `.github/workflows/azure-static-web-apps.yml` - CI/CD
- `backend/.deployment` - Config deployment
- `backend/web.config` - Config para Windows App Service

### Documentación:
- `README.md` - Documentación principal
- `DEPLOYMENT.md` - Guía de despliegue completa
- `QUICK_START.md` - Inicio rápido
- `MEJORAS_ESTRUCTURA.md` - Mejoras implementadas
- `CAMBIOS_IMPLEMENTADOS.md` - Detalle de cambios

---

## ⚠️ Notas Importantes

1. **Variables de Entorno:**
   - Backend: Crear `backend/.env` antes de ejecutar
   - Frontend: Opcional, se puede configurar en `src/api/apiClient.js`

2. **Azure App Service:**
   - Usa el puerto de la variable `PORT` automáticamente
   - No necesitas cambiar código, solo configurar variables de entorno

3. **Static Web Apps:**
   - Deploy automático desde GitHub
   - Solo necesitas conectar el repositorio
   - SSL y dominio personalizado incluidos

4. **Base de Datos:**
   - Para desarrollo local: SQL Server local
   - Para producción: Azure SQL Database
   - Scripts de creación en `database/schema.sql`

---

## 🚀 Comandos Rápidos

```bash
# Desarrollo
npm run dev                    # Todo junto
npm run dev:backend            # Solo backend
npm run dev:frontend           # Solo frontend

# Build
npm run build                  # Frontend para producción

# Instalación
npm run install:all           # Instalar todo
```

---

## 📚 Recursos

- [Guía de Despliegue Completa](DEPLOYMENT.md)
- [Inicio Rápido](QUICK_START.md)
- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)

---

---

## 📋 Guía Paso a Paso para Azure

### **Paso 1: Crear Base de Datos (Azure SQL Database)**

1. **Ir a Azure Portal** (https://portal.azure.com)
2. **Crear recurso** → Buscar "SQL Database"
3. **Configurar:**
   - **Nombre de la base de datos:** `rentgamer-db`
   - **Suscripción:** Tu suscripción
   - **Grupo de recursos:** Crear nuevo `rentgamer-rg` (o usar existente)
   - **Servidor:** Crear nuevo servidor
     - **Nombre del servidor:** `rentgamer-server` (debe ser único)
     - **Ubicación:** Elegir la más cercana (ej: East US)
     - **Método de autenticación:** Autenticación de SQL
     - **Login del administrador:** `rentgamer-admin` (o el que prefieras)
     - **Contraseña:** Crear una contraseña segura (¡GUÁRDALA!)
   - **Plan de tarifa:** 
     - **Free tier** (si está disponible) O
     - **Basic** (~$5/mes) - Recomendado para empezar
4. **Revisar y crear** → Esperar a que se cree (2-3 minutos)

5. **Configurar Firewall:**
   - Una vez creado, ir a **"Configurar firewall"** o **"Networking"**
   - **Agregar regla:**
     - Nombre: `AllowAzureServices`
     - IP inicial: `0.0.0.0`
     - IP final: `0.0.0.0`
     - ✅ Marcar "Allow Azure services and resources to access this server"
   - **Guardar**

6. **Obtener Connection String:**
   - Ir a **"Cadenas de conexión"** en el menú izquierdo
   - Copiar la cadena de conexión de **ADO.NET**
   - Se verá así:
     ```
     Server=tcp:rentgamer-server.database.windows.net,1433;Initial Catalog=rentgamer-db;Persist Security Info=False;User ID=rentgamer-admin;Password={tu_contraseña};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
     ```

7. **Crear las tablas:**
   - Ir a **"Editor de consultas"** en Azure Portal
   - O usar **Azure Data Studio** (recomendado)
   - Ejecutar el archivo `database/schema.sql`
   - (Opcional) Ejecutar `database/seed-data.sql` para datos de prueba

---

### **Paso 2: Crear Backend (Azure App Service)**

1. **En Azure Portal:**
   - **Crear recurso** → Buscar "Web App"
   - O ir a **App Services** → **Crear**

2. **Configurar:**
   - **Suscripción:** Tu suscripción
   - **Grupo de recursos:** `rentgamer-rg` (el mismo de antes)
   - **Nombre:** `rentgamer-api` (debe ser único, Azure agregará .azurewebsites.net)
   - **Publicar:** Código
   - **Runtime stack:** Node.js 18 LTS
   - **Sistema operativo:** Linux (más económico)
   - **Región:** La misma que la base de datos
   - **Plan de App Service:**
     - **Crear nuevo plan**
     - **Nombre:** `rentgamer-plan`
     - **Plan de tarifa:** 
       - **Free (F1)** - Gratis pero con limitaciones
       - **Basic B1** - ~$13/mes (recomendado para producción)

3. **Revisar y crear** → Esperar (2-3 minutos)

4. **Configurar Variables de Entorno:**
   - Una vez creado, ir a **"Configuración"** → **"Variables de aplicación"**
   - **Agregar las siguientes variables:**
     ```
     DB_SERVER=rentgamer-server.database.windows.net
     DB_NAME=rentgamer-db
     DB_USER=rentgamer-admin@rentgamer-server
     DB_PASSWORD=tu_contraseña_aquí
     DB_PORT=1433
     DB_ENCRYPT=true
     DB_TRUST_CERT=false
     PORT=8080
     NODE_ENV=production
     FRONTEND_URL=https://tu-frontend.azurestaticapps.net
     ```
   - **Guardar** (esto reiniciará la app)

5. **Configurar Deployment:**
   - Ir a **"Centro de implementación"** (Deployment Center)
   - **Origen:** GitHub
   - **Autorizar** con tu cuenta de GitHub
   - **Organización:** Tu organización/usuario
   - **Repositorio:** `RentGamer` (o el nombre de tu repo)
   - **Rama:** `main` (o `master`)
   - **Carpeta:** `backend`
   - **Build provider:** App Service build service
   - **Guardar**

6. **Verificar Deployment:**
   - Ir a **"Registros de implementación"** para ver el progreso
   - El primer deploy puede tardar 5-10 minutos
   - Una vez completado, tu API estará en: `https://rentgamer-api.azurewebsites.net`

---

### **Paso 3: Crear Frontend (Azure Static Web Apps)**

1. **En Azure Portal:**
   - **Crear recurso** → Buscar "Static Web App"
   - O ir a **Static Web Apps** → **Crear**

2. **Configurar:**
   - **Suscripción:** Tu suscripción
   - **Grupo de recursos:** `rentgamer-rg`
   - **Nombre:** `rentgamer-frontend` (o el que prefieras)
   - **Plan:** Free
   - **Región:** La misma que los otros recursos
   - **Origen:** GitHub
   - **Autorizar** con tu cuenta de GitHub
   - **Organización:** Tu organización/usuario
   - **Repositorio:** `RentGamer`
   - **Rama:** `main`
   - **Build Presets:** React
   - **Ubicación de la aplicación:** `/frontend`
   - **Ubicación del artefacto:** `build`
   - **Ubicación de la API:** (dejar vacío)

3. **Revisar y crear** → Esperar (2-3 minutos)

4. **Obtener URL:**
   - Una vez creado, ir a **"Información general"**
   - Copiar la **URL** (será algo como: `https://rentgamer-frontend.azurestaticapps.net`)

5. **Actualizar CORS en Backend:**
   - Volver a **App Service** → **Configuración** → **Variables de aplicación**
   - Actualizar `FRONTEND_URL` con la URL de Static Web App:
     ```
     FRONTEND_URL=https://rentgamer-frontend.azurestaticapps.net
     ```
   - **Guardar** (reiniciará el backend)

6. **Actualizar Frontend con URL del Backend:**
   - En tu repositorio, crear/actualizar `frontend/.env.production`:
     ```env
     REACT_APP_API_URL=https://rentgamer-api.azurewebsites.net
     ```
   - O actualizar `frontend/src/api/apiClient.js`:
     ```javascript
     baseURL: process.env.REACT_APP_API_URL || 'https://rentgamer-api.azurewebsites.net'
     ```
   - Hacer commit y push (se desplegará automáticamente)

---

### **Paso 4: Verificar que Todo Funcione**

1. **Probar Backend:**
   - Abrir: `https://rentgamer-api.azurewebsites.net/health`
   - Debe responder: `{"status":"OK","message":"Servidor funcionando correctamente"}`

2. **Probar API de Juegos:**
   - Abrir: `https://rentgamer-api.azurewebsites.net/api/games`
   - Debe devolver un array de juegos (o array vacío si no hay datos)

3. **Probar Frontend:**
   - Abrir: `https://rentgamer-frontend.azurestaticapps.net`
   - Debe cargar la aplicación
   - Verificar que los juegos se muestren (si hay datos en la BD)

4. **Si no hay juegos:**
   - Ejecutar el script de migración localmente apuntando a Azure:
     ```bash
     # Actualizar backend/.env con credenciales de Azure
     node database/migrate-games.js
     ```

---

### **Paso 5: Configurar Dominio Personalizado (Opcional)**

1. **Comprar dominio** (Namecheap, GoDaddy, etc.)

2. **Para Static Web App:**
   - En Azure Portal → Static Web App → **Dominios personalizados**
   - **Agregar dominio personalizado**
   - Seguir las instrucciones para configurar DNS
   - Azure configurará SSL automáticamente

3. **Para App Service:**
   - En Azure Portal → App Service → **Dominios personalizados**
   - **Agregar dominio personalizado**
   - Configurar DNS según las instrucciones

---

## ⚠️ Checklist de Despliegue

- [ ] Base de datos SQL creada en Azure
- [ ] Firewall configurado (permitir Azure services)
- [ ] Tablas creadas (ejecutar schema.sql)
- [ ] App Service creado para backend
- [ ] Variables de entorno configuradas en App Service
- [ ] Deployment Center conectado a GitHub
- [ ] Static Web App creado para frontend
- [ ] Static Web App conectado a GitHub
- [ ] CORS actualizado con URL del frontend
- [ ] Frontend actualizado con URL del backend
- [ ] Health check del backend funciona
- [ ] API de juegos responde correctamente
- [ ] Frontend carga y muestra datos
- [ ] (Opcional) Dominio personalizado configurado

---

## 💰 Costos Estimados

### **Opción Gratis (Free Tier):**
- Static Web Apps: **$0**
- App Service (F1): **$0** (con limitaciones)
- SQL Database (si hay free tier): **$0**
- **Total: $0/mes**

### **Opción Básica (Recomendada):**
- Static Web Apps: **$0**
- App Service (B1): **~$13/mes**
- SQL Database (Basic): **~$5/mes**
- **Total: ~$18/mes**

---

## 🐛 Troubleshooting Común

### **Backend no inicia:**
- Verificar variables de entorno en App Service
- Ver logs: App Service → **Registros** → **Log stream**
- Verificar que el código esté en la rama correcta

### **Error de conexión a base de datos:**
- Verificar firewall (debe permitir Azure services)
- Verificar credenciales en variables de entorno
- Verificar que el usuario tenga formato: `usuario@servidor`

### **Frontend no carga:**
- Verificar que el build se completó: Static Web App → **Registros de implementación**
- Verificar que la carpeta sea `/frontend` y output sea `build`
- Verificar `staticwebapp.config.json`

### **CORS errors:**
- Verificar que `FRONTEND_URL` en backend tenga la URL correcta
- Verificar que no tenga `/` al final
- Verificar configuración en `backend/src/config/cors.js`

---

**¡Todo listo para desarrollar y desplegar! 🎉**

