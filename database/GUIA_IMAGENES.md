# 🖼️ Guía de Almacenamiento de Imágenes - RentGamer

## 📋 Opciones de Almacenamiento

### **Opción 1: Imágenes en `public/` (Actual - Gratis) ✅ RECOMENDADO PARA EMPEZAR**

**Ubicación:** `frontend/public/imgGames/`

**Ventajas:**
- ✅ **Gratis** - No hay costos adicionales
- ✅ **Simple** - Solo copiar archivos
- ✅ **Rápido de implementar** - No requiere configuración adicional
- ✅ **Funciona con Static Web Apps** - Azure Static Web Apps sirve archivos estáticos automáticamente

**Desventajas:**
- ⚠️ Limitado por el tamaño del repositorio
- ⚠️ No optimización automática de imágenes
- ⚠️ No CDN dedicado (aunque Static Web Apps incluye CDN básico)

**Cómo funciona:**
- Las imágenes en `frontend/public/` se copian automáticamente al build
- Se acceden con rutas relativas: `/imgGames/action1.png`
- Estas rutas se guardan en la base de datos como strings

**Ejemplo en BD:**
```sql
INSERT INTO Games (name, image, ...) 
VALUES ('Fuego Mortal', '/imgGames/action1.png', ...);
```

---

### **Opción 2: Azure Blob Storage (Recomendado para Producción)**

**Ubicación:** Azure Blob Storage Container

**Ventajas:**
- ✅ **Escalable** - Sin límites de tamaño
- ✅ **CDN integrado** - Azure CDN para imágenes
- ✅ **Optimización** - Puedes usar Azure Image Resizer
- ✅ **Costo bajo** - ~$0.0184/GB/mes (muy barato)
- ✅ **Separación de concerns** - Imágenes separadas del código

**Desventajas:**
- ⚠️ Requiere configuración adicional
- ⚠️ Necesitas subir imágenes manualmente o crear script
- ⚠️ Pequeño costo (pero muy bajo)

**Configuración:**

1. **Crear Blob Storage en Azure:**
   - Azure Portal → Crear recurso → Storage Account
   - Crear container: `game-images`
   - Configurar acceso público (blob)

2. **Subir imágenes:**
   ```bash
   # Usando Azure CLI
   az storage blob upload-batch \
     --source frontend/public/imgGames \
     --destination game-images \
     --account-name tu-storage-account
   ```

3. **Obtener URL base:**
   ```
   https://tu-storage-account.blob.core.windows.net/game-images/
   ```

4. **Actualizar rutas en BD:**
   ```sql
   UPDATE Games 
   SET image = REPLACE(image, '/imgGames/', 'https://tu-storage-account.blob.core.windows.net/game-images/')
   WHERE image LIKE '/imgGames/%';
   ```

---

### **Opción 3: Azure Static Web Apps Assets (Híbrido)**

**Ubicación:** `frontend/public/imgGames/` + Azure Static Web Apps

**Ventajas:**
- ✅ **Gratis** - Incluido en Static Web Apps
- ✅ **CDN automático** - Azure Static Web Apps incluye CDN
- ✅ **Sin configuración** - Funciona automáticamente

**Cómo funciona:**
- Las imágenes en `public/` se despliegan automáticamente
- Azure Static Web Apps las sirve con CDN
- URLs automáticas: `https://tu-app.azurestaticapps.net/imgGames/action1.png`

---

## 🎯 Recomendación por Etapa

### **Desarrollo / Demo (Actual):**
✅ **Usar `public/imgGames/`** - Simple, gratis, suficiente

### **Producción Pequeña-Mediana:**
✅ **Azure Static Web Apps Assets** - Gratis, CDN incluido

### **Producción Grande / Muchas Imágenes:**
✅ **Azure Blob Storage** - Escalable, optimización avanzada

---

## 📝 Cómo Guardar Rutas en la Base de Datos

### **Estructura Actual:**

Las rutas se guardan como **strings** en el campo `image` de la tabla `Games`:

```sql
CREATE TABLE Games (
    ...
    image NVARCHAR(500) NULL,  -- Ruta de la imagen
    ...
);
```

### **Formatos de Ruta:**

1. **Ruta Relativa (Recomendado para empezar):**
   ```sql
   '/imgGames/action1.png'
   ```
   - Funciona con `public/` local
   - Funciona con Static Web Apps
   - Se resuelve automáticamente

2. **URL Completa (Para Blob Storage):**
   ```sql
   'https://tu-storage.blob.core.windows.net/game-images/action1.png'
   ```
   - Para producción con Blob Storage
   - CDN dedicado

3. **URL Relativa al Dominio:**
   ```sql
   'https://rentgamer.azurestaticapps.net/imgGames/action1.png'
   ```
   - Si quieres URLs absolutas
   - Útil para compartir enlaces

---

## 🔄 Migración de Imágenes

### **Script para Migrar a Blob Storage (Futuro):**

```javascript
// database/migrate-images-to-blob.js
const { BlobServiceClient } = require('@azure/storage-blob');
const sql = require('mssql');

async function migrateToBlob() {
  // 1. Conectar a Blob Storage
  const blobService = BlobServiceClient.fromConnectionString(connectionString);
  const container = blobService.getContainerClient('game-images');
  
  // 2. Subir imágenes desde public/
  // 3. Actualizar rutas en BD
}
```

---

## 📊 Comparación de Costos

| Opción | Costo Mensual | Límite |
|--------|---------------|--------|
| `public/` (Static Web Apps) | **$0** | 100 GB/mes ancho de banda |
| Azure Blob Storage | **~$0.02/GB** | Ilimitado |
| Azure CDN | **$0.04/GB** | Ilimitado (opcional) |

**Ejemplo:** 1 GB de imágenes = $0.02/mes (muy barato)

---

## ✅ Implementación Actual

### **Estructura de Archivos:**
```
frontend/
├── public/
│   └── imgGames/
│       ├── action1.png
│       ├── action2.png
│       ├── adventure1.jpg
│       └── ...
└── src/
    └── data/
        └── games.js  (referencias: '/imgGames/action1.png')
```

### **En la Base de Datos:**
```sql
-- Las rutas se guardan así:
INSERT INTO Games (name, image, ...) VALUES
('Fuego Mortal', '/imgGames/action1.png', ...);
```

### **En el Frontend:**
```jsx
// Las imágenes se usan directamente:
<img src={game.image} alt={game.name} />
// game.image = '/imgGames/action1.png'
```

---

## 🚀 Próximos Pasos

1. **Ahora (Desarrollo):**
   - ✅ Mantener imágenes en `public/imgGames/`
   - ✅ Usar rutas relativas: `/imgGames/...`
   - ✅ Guardar rutas en BD como strings

2. **Cuando crezca (Producción):**
   - Considerar Azure Blob Storage
   - Implementar optimización de imágenes
   - Usar CDN para mejor rendimiento

---

## 📝 Notas Importantes

1. **Las rutas son relativas a `public/`:**
   - `/imgGames/action1.png` → `public/imgGames/action1.png`
   - Se resuelven automáticamente en el navegador

2. **Azure Static Web Apps:**
   - Copia automáticamente `public/` al deploy
   - Las rutas funcionan igual que en local

3. **Optimización Futura:**
   - Puedes usar `next/image` o `react-image` para lazy loading
   - Implementar diferentes tamaños (thumbnails, full)
   - Comprimir imágenes antes de subir

---

**Recomendación:** Por ahora, mantén las imágenes en `public/imgGames/` y guarda las rutas como strings en la BD. Es simple, gratis y funciona perfectamente. Cuando necesites escalar, migra a Blob Storage.


