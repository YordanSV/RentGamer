# 🎮 RentGamer

Plataforma de alquiler de videojuegos desarrollada con React y Node.js.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- MySQL (para desarrollo local)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/rentgamer.git
cd rentgamer

# Instalar dependencias
npm run install:all
```

### Configuración

1. **Backend:**
   - Copiar `backend/.env.example` a `backend/.env`
   - Configurar variables de entorno (base de datos, puertos, etc.)

2. **Frontend:**
   - Las variables de entorno se configuran en `frontend/.env` si es necesario
   - Por defecto usa la URL del backend configurada en `src/api/apiClient.js`

### Ejecución Local

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
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

## 📁 Estructura del Proyecto

```
RentGamer/
├── backend/              # API Node.js/Express
│   └── src/
│       ├── config/       # Configuración (DB, CORS)
│       ├── controllers/  # Controladores
│       ├── middleware/   # Middleware (errores, logging)
│       ├── models/       # Modelos de datos
│       ├── routes/       # Rutas
│       ├── services/     # Lógica de negocio
│       └── validators/   # Validación de datos
├── frontend/            # Aplicación React
│   └── src/
│       ├── api/          # Servicios de API
│       ├── components/   # Componentes React
│       ├── contexts/    # Contextos (Cart, etc.)
│       ├── hooks/        # Hooks personalizados
│       ├── pages/        # Páginas
│       ├── styles/       # Estilos globales
│       └── utils/        # Utilidades
├── scripts/              # Scripts de desarrollo y build
└── docs/                 # Documentación
```

## 🛠️ Scripts Disponibles

### Desde la raíz del proyecto:

```bash
npm run install:all      # Instalar dependencias de backend y frontend
npm run dev              # Ejecutar backend y frontend en desarrollo
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend
npm run build            # Construir frontend para producción
```

### Backend:

```bash
cd backend
npm start                # Iniciar servidor en producción
npm run dev              # Iniciar servidor en desarrollo (con nodemon)
```

### Frontend:

```bash
cd frontend
npm start                # Iniciar en desarrollo
npm run build            # Construir para producción
```

## ☁️ Despliegue en Azure

Para desplegar en Azure (gratis o con costos mínimos), consulta la [Guía de Despliegue](DEPLOYMENT.md).

### Resumen Rápido:

1. **Frontend:** Azure Static Web Apps (Gratis)
2. **Backend:** Azure App Service Free Tier (F1)
3. **Base de Datos:** Azure Database for MySQL Free Tier

**Costo estimado:** $0-25/mes (solo dominio opcional)

## 🧪 Testing

```bash
# Backend (cuando se implementen tests)
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📚 Tecnologías Utilizadas

### Backend:
- Node.js
- Express.js
- MySQL2
- dotenv

### Frontend:
- React 18
- React Router
- Axios
- Styled Components
- React Slick

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👤 Autor

Tu nombre - [@tu-twitter](https://twitter.com/tu-twitter)

## 🙏 Agradecimientos

- [Create React App](https://github.com/facebook/create-react-app)
- [Express.js](https://expressjs.com/)
- [Azure](https://azure.microsoft.com/)

---

**¿Necesitas ayuda?** Consulta la [documentación completa](DEPLOYMENT.md) o abre un issue.
