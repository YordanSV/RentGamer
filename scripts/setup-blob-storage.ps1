# Script para Setup Automático de Azure Blob Storage
# Este script crea Storage Account, Container, y sube todas las imágenes

param(
    [string]$StorageAccountName = "rentgamerstorage",
    [string]$ResourceGroupName = "RentGamer",
    [string]$ContainerName = "img-games",
    [string]$Region = "eastus2",
    [string]$ImageSourcePath = "C:\Users\yorda\OneDrive\Documents\RentGamer\frontend\public\imgGames"
)

# Colores para output
$Green = [System.ConsoleColor]::Green
$Red = [System.ConsoleColor]::Red
$Yellow = [System.ConsoleColor]::Yellow
$Cyan = [System.ConsoleColor]::Cyan

function Write-Status([string]$Message, [string]$Status = "INFO") {
    $Color = switch($Status) {
        "SUCCESS" { $Green }
        "ERROR" { $Red }
        "WARNING" { $Yellow }
        default { $Cyan }
    }
    Write-Host "[$Status] $Message" -ForegroundColor $Color
}

function Exit-OnError([string]$ErrorMessage) {
    Write-Status $ErrorMessage "ERROR"
    exit 1
}

# ============================================================
# PASO 1: Verificar requisitos
# ============================================================

Write-Host "`n========================================" -ForegroundColor $Cyan
Write-Host "  Azure Blob Storage Setup para RentGamer" -ForegroundColor $Cyan
Write-Host "========================================`n" -ForegroundColor $Cyan

Write-Status "Verificando requisitos..." "INFO"

# Verificar Azure CLI instalado
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    Exit-OnError "Azure CLI no está instalado. Descargalo desde: https://aka.ms/installazurecliwindows"
}

Write-Status "Azure CLI verificado" "SUCCESS"

# Verificar carpeta de imágenes
if (-not (Test-Path $ImageSourcePath)) {
    Exit-OnError "No se encontró carpeta de imágenes: $ImageSourcePath"
}

$ImageCount = (Get-ChildItem -Path $ImageSourcePath -File).Count
Write-Status "Se encontraron $ImageCount imágenes en: $ImageSourcePath" "SUCCESS"

# Verificar autenticación
Write-Status "Verificando autenticación de Azure..." "INFO"
$CurrentUser = az account show --query user.name -o tsv 2>$null
if (-not $CurrentUser) {
    Write-Status "Requiere autenticación. Abriendo navegador..." "WARNING"
    az login
}

Write-Status "Autenticado como: $CurrentUser" "SUCCESS"

# ============================================================
# PASO 2: Crear Storage Account
# ============================================================

Write-Host "`n--- PASO 1: Crear Storage Account ---`n"

Write-Status "Verificando si Storage Account existe: $StorageAccountName" "INFO"

$StorageExists = az storage account exists `
    --name $StorageAccountName `
    --resource-group $ResourceGroupName `
    --query value -o tsv

if ($StorageExists -eq "true") {
    Write-Status "Storage Account ya existe: $StorageAccountName" "WARNING"
}
else {
    Write-Status "Creando Storage Account: $StorageAccountName" "INFO"
    
    try {
        az storage account create `
            --name $StorageAccountName `
            --resource-group $ResourceGroupName `
            --location $Region `
            --sku Standard_LRS `
            --kind StorageV2 `
            --access-tier Hot | Out-Null
        
        Write-Status "Storage Account creado exitosamente" "SUCCESS"
    }
    catch {
        Exit-OnError "Error al crear Storage Account: $_"
    }
}

# ============================================================
# PASO 3: Crear Container
# ============================================================

Write-Host "`n--- PASO 2: Crear Container ---`n"

Write-Status "Verificando si Container existe: $ContainerName" "INFO"

$ContainerExists = az storage container exists `
    --name $ContainerName `
    --account-name $StorageAccountName `
    --query exists -o tsv

if ($ContainerExists -eq "true") {
    Write-Status "Container ya existe: $ContainerName" "WARNING"
}
else {
    Write-Status "Creando Container: $ContainerName con acceso público" "INFO"
    
    try {
        az storage container create `
            --name $ContainerName `
            --account-name $StorageAccountName `
            --public-access blob | Out-Null
        
        Write-Status "Container creado exitosamente" "SUCCESS"
    }
    catch {
        Exit-OnError "Error al crear Container: $_"
    }
}

# Asegurar que es público
az storage container set-permission `
    --name $ContainerName `
    --public-access blob `
    --account-name $StorageAccountName | Out-Null

# ============================================================
# PASO 4: Subir Imágenes
# ============================================================

Write-Host "`n--- PASO 3: Subir Imágenes ---`n"

Write-Status "Preparando para subir $ImageCount imágenes..." "INFO"

$Images = Get-ChildItem -Path $ImageSourcePath -File
$UploadCount = 0
$ErrorCount = 0

foreach ($Image in $Images) {
    try {
        $ProgressMessage = "Subiendo: $($Image.Name)"
        Write-Status $ProgressMessage "INFO"
        
        az storage blob upload `
            --file $Image.FullName `
            --container-name $ContainerName `
            --name $Image.Name `
            --account-name $StorageAccountName `
            --overwrite | Out-Null
        
        Write-Status "✓ Subido: $($Image.Name)" "SUCCESS"
        $UploadCount++
    }
    catch {
        Write-Status "✗ Error subiendo $($Image.Name): $_" "ERROR"
        $ErrorCount++
    }
}

Write-Host ""
Write-Status "Imágenes subidas: $UploadCount de $ImageCount" "INFO"
if ($ErrorCount -gt 0) {
    Write-Status "Errores encontrados: $ErrorCount" "WARNING"
}

# ============================================================
# PASO 5: Obtener URLs
# ============================================================

Write-Host "`n--- PASO 4: URLs Generadas ---`n"

$StorageURL = "https://$StorageAccountName.blob.core.windows.net/$ContainerName"

Write-Status "URLs de Blob Storage:" "INFO"
Write-Host "  Base: $StorageURL"
Write-Host "  Ejemplo: $StorageURL/action1.png`n"

# ============================================================
# PASO 6: Mostrar configuración
# ============================================================

Write-Host "--- PASO 5: Configuración para .env ---`n"

Write-Host "Agrega a tu archivo .env:" -ForegroundColor $Cyan
Write-Host "`nPara DESARROLLO:"
Write-Host "  REACT_APP_BLOB_STORAGE_URL=http://localhost:3000`n" -ForegroundColor $Green

Write-Host "Para PRODUCCIÓN:"
Write-Host "  REACT_APP_BLOB_STORAGE_URL=$StorageURL" -ForegroundColor $Green
Write-Host "  # O si configuraste CDN:"
Write-Host "  # REACT_APP_BLOB_STORAGE_URL=https://rentgamer.azureedge.net`n"

# ============================================================
# RESUMEN FINAL
# ============================================================

Write-Host "========================================" -ForegroundColor $Cyan
Write-Host "  ✅ Setup Completado!" -ForegroundColor $Green
Write-Host "========================================`n" -ForegroundColor $Cyan

Write-Host "Resumen:" -ForegroundColor $Cyan
Write-Host "  Storage Account: $StorageAccountName" -ForegroundColor $Green
Write-Host "  Container: $ContainerName" -ForegroundColor $Green
Write-Host "  Imágenes subidas: $UploadCount" -ForegroundColor $Green
Write-Host "  URL Base: $StorageURL`n" -ForegroundColor $Green

Write-Host "Próximos pasos:" -ForegroundColor $Cyan
Write-Host "  1. Copiar URL de Blob Storage a tu .env"
Write-Host "  2. (Opcional) Crear CDN: ./setup-cdn.ps1"
Write-Host "  3. Actualizar frontend: npm start"
Write-Host "  4. Desplegar a Azure Static Web Apps`n"

Write-Status "¡Setup completado exitosamente!" "SUCCESS"
