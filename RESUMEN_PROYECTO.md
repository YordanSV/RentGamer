# 🎮 RentGamer - Plataforma de Alquiler de Videojuegos

## 📋 Descripción del Proyecto

**RentGamer** es una plataforma web completa para el alquiler de videojuegos desarrollada desde cero. El proyecto permite a los usuarios explorar un catálogo de juegos, agregarlos a un carrito de compras, ver detalles de cada título y gestionar sus alquileres. La aplicación está diseñada con una arquitectura moderna separando frontend y backend, utilizando tecnologías actuales y siguiendo mejores prácticas de desarrollo.

---

## 🛠️ Stack Tecnológico

### **Frontend:**
- **React 18** - Biblioteca principal para la interfaz de usuario
- **React Router** - Navegación entre páginas
- **Styled Components** - Estilos componentizados
- **Axios** - Cliente HTTP para comunicación con la API
- **React Hooks** - Gestión de estado y efectos
- **Context API** - Gestión global del estado (carrito de compras)

### **Backend:**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para la API REST
- **SQL Server / Azure SQL Database** - Base de datos relacional
- **mssql** - Driver para conexión a SQL Server

### **Infraestructura:**
- **Azure Static Web Apps** - Hosting del frontend (gratis)
- **Azure App Service** - Hosting del backend (free tier)
- **Azure SQL Database** - Base de datos en la nube
- **GitHub Actions** - CI/CD automático

---

## 🏗️ Arquitectura del Proyecto

### **Estructura del Backend:**
```
backend/
├── src/
│   ├── config/          # Configuración (DB, CORS)
│   ├── controllers/     # Controladores HTTP
│   ├── services/        # Lógica de negocio
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Manejo de errores, logging
│   ├── validators/      # Validación de datos
│   ├── app.js           # Configuración de Express
│   └── server.js        # Punto de entrada
```

### **Estructura del Frontend:**
```
frontend/
├── src/
│   ├── api/             # Servicios de API centralizados
│   ├── components/      # Componentes React reutilizables
│   ├── pages/           # Páginas principales
│   ├── hooks/           # Hooks personalizados
│   ├── contexts/        # Contextos (Carrito)
│   ├── utils/           # Utilidades y constantes
│   └── styles/          # Estilos globales
```

---

## 🎯 Características Principales

### **1. Catálogo de Juegos**
- Visualización de juegos organizados por categorías (Acción, Aventura, Estrategia)
- Búsqueda y filtrado de juegos
- Detalles completos de cada juego (imagen, descripción, precio)
- Carousel interactivo por categorías

### **2. Carrito de Comras**
- Agregar/eliminar juegos del carrito
- Gestión de cantidad de días de alquiler
- Cálculo automático de precios totales
- Persistencia del estado del carrito

### **3. Sistema de Suscripciones**
- Diferentes planes de suscripción (básico, premium)
- Gestión de fechas de inicio y fin
- Estados de suscripción (activa, cancelada, expirada)

### **4. Base de Datos Relacional**
- **7 tablas principales:**
  - Users (usuarios)
  - Categories (categorías)
  - Games (juegos)
  - Subscriptions (suscripciones)
  - Rentals (alquileres)
  - CartItems (items del carrito)
  - Reviews (reseñas)
- Relaciones bien definidas con foreign keys
- Índices para optimización de consultas
- Triggers para auditoría automática

---

## 🚀 Desafíos Resueltos y Mejoras Implementadas

### **1. Migración de MySQL a SQL Server**
- **Desafío:** Cambiar de MySQL a SQL Server para mejor integración con Azure
- **Solución:**
  - Refactorización completa de la capa de acceso a datos
  - Actualización de sintaxis SQL (parámetros nombrados, OUTPUT clauses)
  - Migración de modelos y queries
  - Scripts de migración de datos

### **2. Reestructuración de la Arquitectura**
- **Problema inicial:** Código mezclado, sin separación de responsabilidades
- **Solución implementada:**
  - **Capa de Servicios:** Separación de lógica de negocio de controladores
  - **Middleware centralizado:** Manejo de errores y logging unificado
  - **Validadores:** Validación de datos antes de procesarlos
  - **Configuración modular:** CORS, base de datos, variables de entorno

### **3. Migración de Datos Estáticos a API Dinámica**
- **Problema:** Frontend usaba JSON estático hardcodeado
- **Solución:**
  - Creación de servicio de API centralizado (`gameApi`)
  - Hook personalizado `useApi` para manejo de estados (loading, error, data)
  - Actualización de todos los componentes para usar la API
  - Script de migración de JSON a base de datos

### **4. Organización de Assets e Imágenes**
- **Solución implementada:**
  - Imágenes organizadas en `public/imgGames/`
  - Rutas guardadas en base de datos como strings
  - Compatible con Azure Static Web Apps (CDN incluido)
  - Documentación para futura migración a Blob Storage si es necesario

### **5. Configuración para Despliegue en Azure**
- **Implementado:**
  - Configuración para Azure Static Web Apps (frontend)
  - Configuración para Azure App Service (backend)
  - Scripts de build y deployment
  - Variables de entorno documentadas
  - CI/CD con GitHub Actions

---

## 📊 Modelo de Base de Datos

### **Relaciones Principales:**
- **Users** → **Subscriptions** (1:N) - Un usuario puede tener múltiples suscripciones
- **Users** → **Rentals** (1:N) - Un usuario puede tener múltiples alquileres
- **Users** → **CartItems** (1:N) - Un usuario puede tener múltiples items en el carrito
- **Categories** → **Games** (1:N) - Una categoría tiene múltiples juegos
- **Games** → **Rentals** (1:N) - Un juego puede ser alquilado múltiples veces
- **Rentals** → **Reviews** (1:1 opcional) - Un alquiler puede tener una reseña

### **Características del Modelo:**
- Soft delete con campo `is_active`
- Campos de auditoría (`created_at`, `updated_at`)
- Triggers automáticos para actualizar timestamps
- Constraints para validación de datos
- Índices optimizados para consultas frecuentes

---

## 🔧 Mejores Prácticas Implementadas

### **Backend:**
- ✅ Separación de responsabilidades (Controllers → Services → Models)
- ✅ Manejo centralizado de errores
- ✅ Validación de datos de entrada
- ✅ Logging de peticiones HTTP
- ✅ Configuración mediante variables de entorno
- ✅ Código modular y reutilizable

### **Frontend:**
- ✅ Componentes reutilizables
- ✅ Hooks personalizados para lógica compartida
- ✅ Servicios de API centralizados
- ✅ Manejo de estados de carga y error
- ✅ Context API para estado global
- ✅ Estilos componentizados con Styled Components

### **DevOps:**
- ✅ Scripts de desarrollo y build automatizados
- ✅ CI/CD configurado
- ✅ Documentación completa
- ✅ Variables de entorno documentadas
- ✅ Scripts de migración de datos

---

## 📈 Escalabilidad y Optimización

### **Optimizaciones Implementadas:**
- Índices en campos frecuentemente consultados
- Connection pooling para la base de datos
- Lazy loading de imágenes (preparado)
- Código splitting en React (automático con Create React App)
- CDN para assets estáticos (Azure Static Web Apps)

### **Preparado para Escalar:**
- Arquitectura lista para microservicios
- Base de datos normalizada y optimizada
- Código modular fácil de extender
- Configuración lista para producción en Azure

---

## 🎓 Aprendizajes y Logros

### **Técnicos:**
- Migración exitosa entre sistemas de base de datos
- Implementación de arquitectura en capas
- Integración completa frontend-backend
- Configuración de infraestructura en la nube

### **Organizacionales:**
- Documentación completa del proyecto
- Scripts de automatización
- Mejores prácticas de desarrollo
- Estructura de proyecto escalable

---

## 📝 Estado Actual del Proyecto

### **Completado:**
- ✅ Arquitectura backend completa
- ✅ API REST funcional
- ✅ Frontend conectado a la API
- ✅ Base de datos relacional diseñada e implementada
- ✅ Sistema de autenticación preparado (estructura)
- ✅ Carrito de compras funcional
- ✅ Configuración para despliegue en Azure

### **En Desarrollo / Futuro:**
- Sistema de pagos
- Panel de administración
- Sistema de reseñas completo
- Notificaciones por email
- App móvil (React Native)

---

## 💡 Puntos Destacables

1. **Proyecto Completo:** Desde el diseño de la base de datos hasta el despliegue en la nube
2. **Arquitectura Profesional:** Separación de responsabilidades, código limpio y mantenible
3. **Escalable:** Preparado para crecer sin necesidad de refactorización mayor
4. **Documentado:** Documentación completa para facilitar el mantenimiento
5. **Optimizado:** Mejores prácticas implementadas desde el inicio
6. **Cloud-Ready:** Configurado para Azure con opciones gratuitas

---

## 🔗 Tecnologías y Herramientas

- **Lenguajes:** JavaScript (ES6+), SQL
- **Frameworks:** React, Express.js
- **Base de Datos:** SQL Server / Azure SQL Database
- **Cloud:** Microsoft Azure
- **Control de Versiones:** Git / GitHub
- **CI/CD:** GitHub Actions
- **Herramientas:** npm, nodemon, dotenv

---

## 📊 Métricas del Proyecto

- **Líneas de código:** ~5,000+ (frontend + backend)
- **Componentes React:** 15+
- **Endpoints API:** 5 principales (CRUD completo)
- **Tablas de BD:** 7 tablas relacionadas
- **Tiempo de desarrollo:** Proyecto en curso con iteraciones continuas

---

**Este proyecto demuestra habilidades en desarrollo full-stack, arquitectura de software, gestión de bases de datos relacionales, y despliegue en la nube, siguiendo mejores prácticas de la industria.**


