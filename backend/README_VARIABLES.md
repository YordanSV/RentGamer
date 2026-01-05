# 🔐 Variables de Entorno - Guía Rápida

## 📍 Dónde van las variables

**Archivo:** `backend/.env` (crear este archivo, no está en el repo por seguridad)

**Ubicación:** En la carpeta `backend/` del proyecto

---

## ⚡ Configuración Rápida

1. **Copiar el archivo de ejemplo:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Editar `.env` con tus valores:**
   ```env
   DB_SERVER=localhost
   DB_NAME=RentGamer
   DB_USER=sa
   DB_PASSWORD=tu_contraseña
   DB_PORT=1433
   DB_ENCRYPT=false
   DB_TRUST_CERT=false
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

---

## 📋 Variables Explicadas

### **Base de Datos:**
- `DB_SERVER` - Dónde está tu SQL Server (localhost o Azure)
- `DB_NAME` - Nombre de tu base de datos
- `DB_USER` - Usuario para conectarse
- `DB_PASSWORD` - Contraseña del usuario
- `DB_PORT` - Puerto (1433 es el por defecto)
- `DB_ENCRYPT` - true para Azure, false para local
- `DB_TRUST_CERT` - false normalmente

### **Servidor:**
- `PORT` - Puerto donde corre Express (3001 local, 8080 Azure)
- `NODE_ENV` - development o production

### **CORS:**
- `FRONTEND_URL` - URL del frontend para permitir requests

---

## ☁️ Para Azure

En Azure Portal → App Service → Configuration → Application settings:

Usa los mismos nombres pero con valores de Azure:
```env
DB_SERVER=tu-servidor.database.windows.net
DB_USER=admin@tu-servidor
DB_ENCRYPT=true
```

---

**Ver `VARIABLES_ENTORNO.md` para documentación completa**


