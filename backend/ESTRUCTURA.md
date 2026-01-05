# 📁 Estructura del Backend - RentGamer

## ✅ Estructura Actual (En Uso)

El backend usa la estructura en `src/`:

```
backend/
├── src/                    # ⭐ CÓDIGO PRINCIPAL (EN USO)
│   ├── config/
│   │   ├── database.js      # Configuración SQL Server
│   │   └── cors.js          # Configuración CORS
│   ├── controllers/
│   │   └── gameController.js
│   ├── middleware/
│   │   ├── errorHandler.js  # Manejo centralizado de errores
│   │   └── logger.js        # Logging de peticiones
│   ├── models/
│   │   ├── Game.js          # Modelo de juegos (SQL Server)
│   │   └── Category.js      # Modelo de categorías
│   ├── routes/
│   │   └── gameRoutes.js    # Rutas de la API
│   ├── services/
│   │   └── gameService.js   # Lógica de negocio
│   ├── validators/
│   │   └── gameValidator.js # Validación de datos
│   ├── app.js               # Configuración de Express
│   └── server.js            # ⭐ Punto de entrada (usado por package.json)
│
├── .env                     # Variables de entorno (NO en Git)
├── .env.example             # Plantilla de variables
├── package.json             # ⭐ Apunta a src/server.js
└── VARIABLES_ENTORNO.md     # Documentación de variables
```

---

## ❌ Archivos Obsoletos (Eliminados)

Los siguientes archivos fueron eliminados porque son versiones antiguas:

- ~~`backend/config/database.js`~~ - Versión antigua con MySQL
- ~~`backend/models/Game.js`~~ - Versión antigua con MySQL
- ~~`backend/controllers/gameController.js`~~ - Versión antigua sin servicios
- ~~`backend/routes/gameRoutes.js`~~ - Versión antigua sin validadores
- ~~`backend/app.js`~~ - Versión antigua
- ~~`backend/server.js`~~ - Versión antigua con MySQL

**Razón:** Cuando reorganizamos la estructura, creamos todo en `src/` pero no eliminamos los archivos antiguos. Ahora están eliminados para evitar confusión.

---

## 🎯 Punto de Entrada

El servidor se inicia con:
```bash
npm start  # Ejecuta: node src/server.js
```

Definido en `package.json`:
```json
{
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js"
  }
}
```

---

## 📝 Notas

- **Todo el código activo está en `src/`**
- **Los archivos fuera de `src/` son solo configuración y documentación**
- **No hay duplicación de código**

---

**Última actualización:** Archivos obsoletos eliminados


