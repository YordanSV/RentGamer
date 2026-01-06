# ⚡ Inicio Rápido - RentGamer

Guía rápida para empezar a trabajar con el proyecto.

## 🎯 Para Desarrollo Local

### 1. Instalar Dependencias

```bash
npm run install:all
```

### 2. Configurar Base de Datos

Crear archivo `backend/.env`:
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

### 3. Crear Base de Datos

```sql
CREATE DATABASE rentgamer;
```

### 4. Ejecutar

**Windows:**
```powershell
.\scripts\dev-local.ps1
```

**Linux/Mac:**
```bash
./scripts/dev-local.sh
```

✅ Listo! Abre http://localhost:3000

---

## 🚀 Para Desplegar en Azure

### Opción Rápida (5 minutos):

1. **Crear Static Web App:**
   - Azure Portal → Static Web Apps → Crear
   - Conectar GitHub
   - App location: `/frontend`
   - Output: `build`

2. **Crear App Service:**
   - Azure Portal → Web App → Crear
   - Runtime: Node.js 18
   - Plan: Free (F1)

3. **Configurar Variables:**
   - App Service → Configuration
   - Agregar variables de `backend/.env`

4. **Desplegar Backend:**
   - Deployment Center → GitHub
   - Folder: `backend`

✅ Listo! Tu app está en producción.

**Ver [DEPLOYMENT.md](DEPLOYMENT.md) para detalles completos.**

---

## 📦 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Todo junto
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend

# Producción
npm run build            # Build frontend
npm run start:backend    # Backend producción

# Instalación
npm run install:all      # Instalar todo
```

---

## 🐛 Problemas Comunes

### Backend no inicia:
- ✅ Verificar que MySQL esté corriendo
- ✅ Verificar variables en `backend/.env`
- ✅ Verificar que el puerto 3001 esté libre

### Frontend no conecta al backend:
- ✅ Verificar que el backend esté corriendo
- ✅ Verificar URL en `frontend/src/api/apiClient.js`
- ✅ Verificar CORS en `backend/src/config/cors.js`

### Errores de dependencias:
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

---

**¿Necesitas más ayuda?** Ver [DEPLOYMENT.md](DEPLOYMENT.md) o [README.md](README.md)


