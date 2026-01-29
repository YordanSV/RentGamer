# Guía Completa: Azure Blob Storage + CDN para RentGamer

## 📋 Índice
1. [Creación de Storage Account](#creación-de-storage-account)
2. [Configuración del Container](#configuración-del-container)
3. [Subir Imágenes](#subir-imágenes)
4. [Configurar CDN (Opcional)](#configurar-cdn-opcional)
5. [Actualizar URLs en Base de Datos](#actualizar-urls-en-base-de-datos)
6. [Verificar Funcionamiento](#verificar-funcionamiento)
7. [Scripts Automatizados](#scripts-automatizados)

---

## Creación de Storage Account

### Opción A: Azure Portal (Paso a Paso)

#### 1. Ir a Azure Portal
- Ve a [https://portal.azure.com](https://portal.azure.com)
- Inicia sesión con tu cuenta Microsoft

#### 2. Crear Storage Account
1. Busca "Storage accounts" en la barra superior
2. Click en "Create" o "+ New"
3. Rellena los campos:
   - **Subscription**: Tu suscripción
   - **Resource group**: `RentGamer` (la que ya tienes)
   - **Storage account name**: `rentgamerstorage` (debe ser único globally)
   - **Region**: `East US 2` (igual que otros recursos)
   - **Performance**: Standard
   - **Redundancy**: Locally-redundant storage (LRS) - suficiente

4. Click en "Review + create" → "Create"

#### 3. Esperar creación (2-3 minutos)

### Opción B: Azure CLI (más rápido)

```powershell
# Instalar Azure CLI si no lo tienes
# Descarga desde: https://aka.ms/installazurecliwindows

az login
# Se abre navegador para autenticación

az storage account create `
  --name rentgamerstorage `
  --resource-group RentGamer `
  --location eastus2 `
  --sku Standard_LRS `
  --kind StorageV2

# Esperar confirmación
```

---

## Configuración del Container

### Opción A: Portal (Visual)

1. Ve a tu Storage Account (`rentgamerstorage`)
2. Click en "Containers" en el menú izquierdo
3. Click en "+ Container"
4. **Container name**: `img-games`
5. **Public access level**: `Blob` (permite acceso público a blobs)
6. Click "Create"

### Opción B: Azure CLI

```powershell
# Obtener connection string
$storageAccount = "rentgamerstorage"
$resourceGroup = "RentGamer"

az storage container create `
  --name img-games `
  --account-name $storageAccount `
  --public-access blob

# Resultado debe mostrar: "created": true
```

---

## Subir Imágenes

### Las 21 imágenes a subir

**Ubicación actual**: `frontend/public/imgGames/`

**Imágenes**:
```
Acción (12):
- action1.png, action2.png, ..., action12.png

Aventura (5):
- adventure1.jpg, adventure2.jpg, ..., adventure5.jpg
- adventure5.png (alternativo)

Estrategia (4):
- strategy1.png, strategy2.png, strategy3.png, strategy4.png
```

### Opción A: Azure Portal (drag & drop)

1. Ve a tu Storage Account
2. Click en "Containers" → "img-games"
3. Click en "Upload"
4. Selecciona todas las imágenes de `frontend/public/imgGames/`
5. Click "Upload"

### Opción B: Azure Storage Explorer (Recomendado)

**Descargar**: [Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)

1. Abre Storage Explorer
2. Conecta tu Storage Account
3. Navega a img-games container
4. Drag & drop todas las imágenes
5. ¡Listo!

### Opción C: PowerShell (Automatizado)

```powershell
# Script para subir todas las imágenes
$storageAccount = "rentgamerstorage"
$resourceGroup = "RentGamer"
$containerName = "img-games"
$sourceFolder = "C:\Users\yorda\OneDrive\Documents\RentGamer\frontend\public\imgGames"

# Obtener connection string
$connectionString = az storage account show-connection-string `
  --name $storageAccount `
  --resource-group $resourceGroup `
  --query connectionString -o tsv

# Subir todos los archivos
Get-ChildItem -Path $sourceFolder -File | ForEach-Object {
  az storage blob upload `
    --file $_.FullName `
    --container-name $containerName `
    --name $_.Name `
    --account-name $storageAccount `
    --overwrite
  
  Write-Host "✅ Subido: $($_.Name)"
}

Write-Host "`nTodas las imágenes subidas exitosamente!"
```

---

## Configurar CDN (Opcional)

### ¿Para qué sirve CDN?
- **Velocidad**: Imágenes servidas desde servidor más cercano al usuario
- **Costo**: Muy barato ($0.50-1 USD/mes para este caso)
- **Resultado**: ~10x más rápido que acceso directo a Blob

### Crear CDN Profile

#### Opción A: Portal

1. Ve a tu Storage Account
2. Click en "Front Door and CDN" en menú izquierdo
3. Click en "Create CDN profile"
4. Rellena:
   - **Name**: `rentgamer-cdn`
   - **Pricing tier**: `Standard Microsoft`
5. Click "Create"

6. Esperar a que se cree (1-2 minutos)
7. Click en "Endpoints" → "+ Endpoint"
8. Rellena:
   - **Name**: `rentgamer`
   - **Origin type**: Storage (static website)
   - **Origin hostname**: Selecciona tu storage account
9. Click "Add"

#### Opción B: Azure CLI

```powershell
$cdnProfile = "rentgamer-cdn"
$cdnEndpoint = "rentgamer"
$storageAccountUrl = "https://rentgamerstorage.blob.core.windows.net"

# Crear CDN profile
az cdn profile create `
  --name $cdnProfile `
  --resource-group RentGamer `
  --sku Standard_Microsoft

# Crear endpoint
az cdn endpoint create `
  --name $cdnEndpoint `
  --profile-name $cdnProfile `
  --resource-group RentGamer `
  --origin $storageAccountUrl `
  --origin-host-header $storageAccountUrl

Write-Host "CDN creado: https://$cdnEndpoint.azureedge.net"
```

### Obtener URL del CDN

```
https://rentgamer.azureedge.net/img-games/action1.png
```

---

## Actualizar URLs en Base de Datos

### Opción A: Rutas locales → Blob Storage

**Sin cambios**: Las imágenes se cargan desde Blob automáticamente si configuraste `.env`:
```env
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
```

**Función `getImageUrl()` lo hace automáticamente:**
```javascript
// Frontend
getImageUrl('action1.png', 'imgGames')
// Resultado: https://rentgamerstorage.blob.core.windows.net/imgGames/action1.png
```

### Opción B: URLs directas en BD (opcional)

Si prefieres URLs completas en la base de datos:

```sql
-- Actualizar todas las imágenes en la tabla Games
UPDATE Games 
SET image = 'https://rentgamerstorage.blob.core.windows.net/img-games/' + 
            SUBSTRING(image, CHARINDEX('/', image) + 1, LEN(image))
WHERE image LIKE '%img-games%';

-- Verificar
SELECT id, name, image FROM Games;
```

---

## Verificar Funcionamiento

### 1. Verificar que blobs son públicos

```powershell
$url = "https://rentgamerstorage.blob.core.windows.net/img-games/action1.png"

# Debe devolver 200 OK
$response = Invoke-WebRequest -Uri $url -Method Head
Write-Host "Status: $($response.StatusCode)"
```

### 2. Verificar en Frontend

```javascript
// En DevTools Console:
import { getImageUrl } from './src/config/apiConfig';
const url = getImageUrl('action1.png', 'img-games');
console.log(url);
// Debe mostrar: https://rentgamerstorage.blob.core.windows.net/img-games/action1.png

// Verificar que imagen existe
fetch(url).then(r => console.log(r.status)) // 200 = OK
```

### 3. Verificar en Aplicación

1. Inicia frontend: `npm start`
2. Navega a Shop
3. Imágenes de juegos deben cargar desde Blob Storage
4. DevTools > Network: Verifica URLs apuntan a Blob

---

## Scripts Automatizados

Usa los siguientes scripts para automatizar todo:

### setup-blob-storage.ps1

```powershell
# Ver sección "Scripts Automatizados" abajo
```

### setup-cdn.ps1

```powershell
# Ver sección "Scripts Automatizados" abajo
```

---

## Configuración Final en .env

### Development
```env
REACT_APP_BLOB_STORAGE_URL=http://localhost:3000
# Imágenes se cargan desde frontend/public/imgGames/
```

### Production
```env
REACT_APP_BLOB_STORAGE_URL=https://rentgamerstorage.blob.core.windows.net
# O si usas CDN:
REACT_APP_BLOB_STORAGE_URL=https://rentgamer.azureedge.net
REACT_APP_CDN_URL=https://rentgamer.azureedge.net
```

---

## Costos Estimados

| Servicio | Almacenamiento | Transferencia | Total/mes |
|----------|---|---|---|
| Blob Storage | 5GB = $0.10 | 10GB = $0.50 | ~$0.60 |
| CDN | - | Primeros 200GB = $0.00 | $0.00 |
| **Total** | | | **~$0.60/mes** |

⭐ **Muy económico para producción**

---

## Troubleshooting

### ❌ "Access Denied" al acceder a blob

**Causa**: Container no es público

**Solución**:
```powershell
az storage container set-permission `
  --name imgGames `
  --public-access blob `
  --account-name rentgamerstorage
```

### ❌ Imagen no existe

**Verificar**:
```powershell
az storage blob list `
  --container-name img-games `
  --account-name rentgamerstorage `
  --output table
```

### ❌ CDN no actualiza imágenes

**Solución**: Purgar caché
```powershell
az cdn endpoint purge `
  --name rentgamer `
  --profile-name rentgamer-cdn `
  --resource-group RentGamer `
  --content-paths "/*"
```

---

## Resumen de URLs

| Tipo | URL |
|------|-----|
| **Blob Storage** | `https://rentgamerstorage.blob.core.windows.net/img-games/action1.png` |
| **CDN** | `https://rentgamer.azureedge.net/img-games/action1.png` |
| **Connection String** | Disponible en Portal > Storage Account > Access Keys |

---

## Próximas Acciones

1. ✅ Crear Storage Account (`rentgamerstorage`)
2. ✅ Crear Container (`imgGames`)
3. ✅ Subir 21 imágenes
4. ✅ Crear CDN (opcional pero recomendado)
5. ✅ Actualizar `.env` en frontend
6. ✅ Desplegar a Azure Static Web Apps

