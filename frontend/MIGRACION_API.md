# 🔄 Migración del Frontend: JSON Estático → API

## ✅ Cambios Realizados

El frontend ahora obtiene los juegos desde la API en lugar del JSON estático.

---

## 📝 Archivos Modificados

### **1. `src/pages/ShopPage.js`**
- ❌ **Antes:** Importaba `games` desde `../data/games`
- ✅ **Ahora:** Usa `useApi` hook con `gameApi.getAllGames()`
- ✅ Muestra estados de loading y error
- ✅ Obtiene juegos dinámicamente desde la API

### **2. `src/components/shop/GameDetails.js`**
- ❌ **Antes:** Recibía `games` como prop y buscaba por ID
- ✅ **Ahora:** Usa `useApi` con `gameApi.getGameById(id)`
- ✅ Obtiene el juego directamente desde la API
- ✅ Muestra información adicional (precio, categoría)

### **3. `src/App.js`**
- ❌ **Antes:** Importaba `games` y lo pasaba como prop
- ✅ **Ahora:** Eliminado el import, `GameDetails` obtiene datos directamente

### **4. `src/components/shop/CategoryCarousel.js`**
- ✅ **Actualizado:** Ahora maneja `category_name` (de la API) además de `category`

### **5. `src/api/gameApi.js`**
- ✅ **Corregido:** Ahora devuelve directamente `response.data` (el backend ya envía la estructura correcta)

---

## 🔄 Flujo de Datos

### **Antes (JSON Estático):**
```
games.js → ShopPage → CategoryCarousel → GameCarousel
```

### **Ahora (API):**
```
Backend API → gameApi → useApi → ShopPage → CategoryCarousel → GameCarousel
```

---

## 📊 Estructura de Datos

### **Respuesta de la API:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Fuego Mortal",
      "category_id": 1,
      "category_name": "Action",  // ← Nuevo campo
      "price": 23.00,
      "image": "/imgGames/action1.png",
      "description": "...",
      "stock": 10,
      "is_active": true
    }
  ]
}
```

### **Diferencias con el JSON anterior:**

| JSON Anterior | API Actual |
|---------------|------------|
| `category: "Acción"` | `category_name: "Action"` |
| `category` (string) | `category_id` (número) + `category_name` (string) |
| Solo campos básicos | Incluye `stock`, `is_active`, etc. |

---

## 🎯 Componentes Actualizados

### **ShopPage:**
```jsx
// Ahora usa:
const { data, loading, error } = useApi(() => gameApi.getAllGames());
const games = data?.data || [];
```

### **GameDetails:**
```jsx
// Ahora usa:
const { data, loading, error } = useApi(() => gameApi.getGameById(id), [id]);
const game = data?.data;
```

### **CategoryCarousel:**
```jsx
// Ahora maneja ambos formatos:
const category = game.category_name || game.category || 'Sin categoría';
```

---

## ✅ Ventajas de la Migración

1. **Datos Dinámicos:** Los juegos se obtienen desde la base de datos
2. **Actualización en Tiempo Real:** Cambios en la BD se reflejan inmediatamente
3. **Escalabilidad:** Fácil agregar más juegos sin tocar código
4. **Consistencia:** Una sola fuente de verdad (la base de datos)
5. **Mejor UX:** Estados de loading y error manejados

---

## 🧪 Cómo Probar

1. **Asegúrate de que el backend esté corriendo:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Asegúrate de que la base de datos tenga juegos:**
   ```bash
   node database/migrate-games.js
   ```

3. **Inicia el frontend:**
   ```bash
   cd frontend
   npm start
   ```

4. **Verifica:**
   - `/shop` debe mostrar los juegos desde la API
   - `/shop/game/:id` debe mostrar los detalles del juego
   - Los estados de loading deben aparecer brevemente

---

## 🐛 Troubleshooting

### **Error: "Cannot connect to API"**
- Verificar que el backend esté corriendo en el puerto correcto
- Verificar la URL en `src/api/apiClient.js`
- Verificar CORS en el backend

### **Error: "No games found"**
- Verificar que la base de datos tenga juegos
- Ejecutar el script de migración: `node database/migrate-games.js`

### **Error: "category_name is undefined"**
- Verificar que el backend devuelva `category_name` en la respuesta
- Verificar que el JOIN con Categories esté funcionando

---

## 📝 Notas

- El archivo `src/data/games.js` todavía existe pero ya no se usa
- Puedes eliminarlo si quieres, pero es útil como referencia
- Los componentes ahora son más robustos con manejo de errores

---

**✅ Migración completada exitosamente!**


