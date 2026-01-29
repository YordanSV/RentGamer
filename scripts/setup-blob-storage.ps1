# Azure Blob Storage Setup Script
# Crea Storage Account, Container y sube imagenes de juegos

param(
    [string]$StorageAccountName = "rentgamerstorage",
    [string]$ResourceGroupName = "YordanSV",
    [string]$ContainerName = "img-games",
    [string]$Region = "eastus",
    [string]$ImageSourcePath = "frontend\build\imgGames"
)

# Colores
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

function Write-Status {
    param(
        [string]$Message,
        [string]$Status = "INFO"
    )
    
    $Colors = @{
        "SUCCESS" = $Green
        "ERROR"   = $Red
        "WARNING" = $Yellow
        "INFO"    = $Cyan
    }
    
    $Color = $Colors[$Status]
    Write-Host $Message -ForegroundColor $Color
}

Write-Host "`n========================================" -ForegroundColor $Cyan
Write-Host "  Azure Blob Storage Setup" -ForegroundColor $Green
Write-Host "========================================`n" -ForegroundColor $Cyan

# Verificar si Resource Group existe
Write-Host "--- PASO 1: Verificando Resource Group ---`n"
$RGExists = az group exists --name $ResourceGroupName 2>$null | ConvertFrom-Json

if (-not $RGExists) {
    Write-Status "Creando Resource Group: $ResourceGroupName" "INFO"
    az group create --name $ResourceGroupName --location $Region
    Write-Status "Resource Group creado" "SUCCESS"
} else {
    Write-Status "Resource Group existe: $ResourceGroupName" "INFO"
}

# Crear Storage Account
Write-Host "`n--- PASO 2: Crear Storage Account ---`n"
Write-Status "Verificando Storage Account: $StorageAccountName" "INFO"

$SAExists = az storage account show --name $StorageAccountName --resource-group $ResourceGroupName 2>$null

if ($null -eq $SAExists) {
    Write-Status "Creando Storage Account..." "INFO"
    az storage account create `
        --name $StorageAccountName `
        --resource-group $ResourceGroupName `
        --location $Region `
        --sku Standard_LRS `
        --kind StorageV2 | Out-Null
    Write-Status "Storage Account creado exitosamente" "SUCCESS"
} else {
    Write-Status "Storage Account ya existe" "INFO"
}

# Crear Container
Write-Host "`n--- PASO 3: Crear Container ---`n"
Write-Status "Verificando Container: $ContainerName" "INFO"

$ConExists = az storage container exists `
    --name $ContainerName `
    --account-name $StorageAccountName 2>$null | ConvertFrom-Json

if ($ConExists.exists -eq $false) {
    Write-Status "Creando Container..." "INFO"
    az storage container create `
        --name $ContainerName `
        --account-name $StorageAccountName `
        --public-access blob | Out-Null
    Write-Status "Container creado exitosamente" "SUCCESS"
} else {
    Write-Status "Container ya existe" "INFO"
}

# Subir imagenes
Write-Host "`n--- PASO 4: Subiendo Imagenes ---`n"

if (-not (Test-Path $ImageSourcePath)) {
    Write-Status "Error: Carpeta no encontrada: $ImageSourcePath" "ERROR"
    exit 1
}

$Images = Get-ChildItem -Path $ImageSourcePath -File
$ImageCount = $Images.Count
$UploadCount = 0

Write-Status "Imagenes encontradas: $ImageCount" "INFO"
Write-Host ""

foreach ($Image in $Images) {
    Write-Status "Subiendo: $($Image.Name)" "INFO"
    
    az storage blob upload `
        --file $Image.FullName `
        --container-name $ContainerName `
        --name $Image.Name `
        --account-name $StorageAccountName `
        --overwrite 2>$null | Out-Null
    
    $UploadCount++
    Write-Status "  OK: $($Image.Name)" "SUCCESS"
}

# Mostrar URLs
Write-Host "`n--- PASO 5: URLs Generadas ---`n"

$StorageURL = "https://$StorageAccountName.blob.core.windows.net/$ContainerName"

Write-Status "URL Base de Blob Storage:" "SUCCESS"
Write-Host "  $StorageURL`n"

Write-Status "Ejemplo de imagen:" "INFO"
Write-Host "  $StorageURL/action1.png`n"

# Resumen
Write-Host "========================================" -ForegroundColor $Cyan
Write-Host "  SETUP COMPLETADO!" -ForegroundColor $Green
Write-Host "========================================`n" -ForegroundColor $Cyan

Write-Status "Resumen:" "INFO"
Write-Host "  Storage Account: $StorageAccountName"
Write-Host "  Container: $ContainerName"
Write-Host "  Imagenes subidas: $UploadCount"
Write-Host "  URL Base: $StorageURL`n"

Write-Status "Proximos pasos:" "INFO"
Write-Host "  1. Copiar URL a Static Web App:"
Write-Host "     REACT_APP_BLOB_STORAGE_URL=$StorageURL"
Write-Host "  2. Azure Portal > Static Web App > Environment Variables"
Write-Host "  3. El cambio se desplegara automaticamente`n"

Write-Status "Listo para desplegar!" "SUCCESS"
