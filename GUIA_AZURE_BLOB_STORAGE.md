# 🎯 Guía: Configurar Azure Blob Storage + CDN para RentGamer

## 💰 Costos (Muy Económico)

| Servicio | Costo Mensual |
|----------|--------------|
| Azure Storage (imágenes) | ~$0.50 USD |
| Azure CDN | ~$0.50 USD |
| **TOTAL** | **~$1.00 USD/mes** |

✅ **Primer año**: Crédito gratuito de $200 (incluido)

---

## 📋 Paso 1: Crear Storage Account en Azure Portal

### 1.1 Ir a Azure Portal
```
https://portal.azure.com
```

### 1.2 Crear Storage Account
1. Click en **+ Create a resource**
2. Busca **Storage account**
3. Click en **Create**

### 1.3 Llenar formulario
```
Subscription: (tu suscripción)
Resource group: RentGamer_group (igual que SQL Server)
Storage account name: rentgamerstorage (debe ser único, 3-24 caracteres)
Region: East US 2 (igual que tu SQL Server)
Performance: Standard
Redundancy: Locally-redundant storage (LRS)
```

4. Click en **Review + create**
5. Click en **Create**

⏱️ Espera 1-2 minutos a que se cree

---

## 📦 Paso 2: Crear Contenedor (Carpeta) para Imágenes

### 2.1 Una vez creado el Storage Account
1. Ve a **Storage accounts** → **rentgamerstorage**
2. Menú izquierdo → **Containers**
3. Click en **+ Container**

### 2.2 Crear contenedor
```
Name: img-games
Public access level: Blob (public read access for blobs only)
```

4. Click en **Create**

✅ Ahora tienes una carpeta pública donde guardar imágenes

---

## 🖼️ Paso 3: Subir Imágenes

### 3.1 Opción A: Desde Azure Portal (Manual)
1. Abre el contenedor **img-games**
2. Click en **Upload**
3. Selecciona tus imágenes (accion1.png, adventure1.jpg, etc.)
4. Click en **Upload**

### 3.2 Opción B: Usar Azure Storage Explorer (Recomendado)
Descarga: https://azure.microsoft.com/en-us/products/storage/storage-explorer/

```
1. Abre Azure Storage Explorer
2. Conecta tu cuenta Azure
3. Navega a: rentgamerstorage → Blob Containers → img-games
4. Arrastra y suelta tus imágenes
```

---

## 🔗 Paso 4: Obtener URLs de las Imágenes

### 4.1 Estructura de URL
```
https://{storage-account}.blob.core.windows.net/{container}/{filename}

Ejemplo:
https://rentgamerstorage.blob.core.windows.net/img-games/action1.png
```

### 4.2 Obtener URL en Portal
1. Ve a **Storage account** → **img-games**
2. Click en una imagen
3. Click en **Copy URL**

---

## 🚀 Paso 5: Actualizar BD con URLs de Blob Storage

Ejecuta esto en Azure Portal Query Editor:

```sql
-- Actualizar todas las imágenes a URLs de Blob Storage
UPDATE [dbo].[Games]
SET [image] = 'https://rentgamerstorage.blob.core.windows.net/img-games/' + 
              REPLACE(SUBSTRING([image], CHARINDEX('/', [image])+1, LEN([image])), '/', '')
WHERE [image] LIKE '/img-games/%';

-- O manualmente por juego:
UPDATE [dbo].[Games] SET [image] = 'https://rentgamerstorage.blob.core.windows.net/img-games/action1.png' WHERE name = 'Fuego Mortal';
UPDATE [dbo].[Games] SET [image] = 'https://rentgamerstorage.blob.core.windows.net/img-games/adventure3.png' WHERE name = 'El Reino Olvidado';
-- ... etc
```

---

## ⚡ Paso 6 (Opcional): Agregar CDN para Velocidad Global

### 6.1 Crear CDN Profile
1. Azure Portal → **+ Create a resource**
2. Busca **CDN**
3. Click en **Create**

### 6.2 Configurar CDN
```
Name: rentgamer-cdn
Pricing tier: Standard Microsoft
CDN endpoint name: rentgamer-cdn
Origin type: Storage
Origin hostname: rentgamerstorage.blob.core.windows.net
Origin path: /img-games
```

### 6.3 URLs con CDN (más rápido)
```
Antes (Blob Storage):
https://rentgamerstorage.blob.core.windows.net/img-games/action1.png

Después (con CDN):
https://rentgamer-cdn.azureedge.net/img-games/action1.png
```

---

## 📊 Comparativa: Frontend vs Blob Storage

| Aspecto | Frontend Local | Azure Blob Storage |
|---------|---|---|
| **Velocidad** | ❌ Normal | ✅ Muy rápida (CDN) |
| **Almacenamiento ilimitado** | ❌ 5-50 MB | ✅ Hasta 2 TB |
| **Actualizaciones** | ❌ Rebuild | ✅ Upload directo |
| **Costo** | ✅ $0 | ✅ $1/mes |
| **Ancho de banda** | ❌ Limitado | ✅ Ilimitado |
| **HTTPS automático** | ✅ Sí | ✅ Sí |

---

## ✅ Checklist Final

- [ ] Crear Storage Account `rentgamerstorage`
- [ ] Crear contenedor `img-games`
- [ ] Subir todas las imágenes
- [ ] Obtener URLs del Blob Storage
- [ ] Actualizar BD con nuevas URLs
- [ ] (Opcional) Crear CDN profile
- [ ] Probar que las imágenes cargan en el frontend

---

## 🔧 Comandos PowerShell (Alternativa)

Si prefieres usar PowerShell:

```powershell
# Instalar módulo Azure
Install-Module -Name Az -AllowClobber -Force

# Conectar a Azure
Connect-AzAccount

# Crear Storage Account
New-AzStorageAccount -ResourceGroupName "RentGamer_group" `
  -Name "rentgamerstorage" `
  -Location "EastUS2" `
  -SkuName "Standard_LRS" `
  -Kind "StorageV2"

# Crear contenedor
$storageAccount = Get-AzStorageAccount -ResourceGroupName "RentGamer_group" -Name "rentgamerstorage"
New-AzStorageContainer -Name "img-games" -Context $storageAccount.Context -Permission Blob

# Subir imágenes
$imageFiles = Get-ChildItem "C:\ruta\a\tus\imagenes"
foreach ($file in $imageFiles) {
    Set-AzStorageBlobContent -File $file.FullName `
      -Container "imgGames" `
      -Blob $file.Name `
      -Context $storageAccount.Context
}
```

---

## 📞 Soporte

Si necesitas ayuda:
1. Azure Documentation: https://docs.microsoft.com/en-us/azure/storage/
2. Documentación CDN: https://docs.microsoft.com/en-us/azure/cdn/
3. Pricing Calculator: https://azure.microsoft.com/en-us/pricing/calculator/

¿Necesitas ayuda con alguno de estos pasos?
