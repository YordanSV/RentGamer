# Script para Setup Automático de Azure CDN
# Este script crea CDN Profile y Endpoint para acelerar entrega de imágenes

param(
    [string]$StorageAccountName = "rentgamerstorage",
    [string]$ResourceGroupName = "RentGamer",
    [string]$CDNProfileName = "rentgamer-cdn",
    [string]$CDNEndpointName = "rentgamer"
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
# INICIO
# ============================================================

Write-Host "`n========================================" -ForegroundColor $Cyan
Write-Host "  Azure CDN Setup para RentGamer" -ForegroundColor $Cyan
Write-Host "========================================`n" -ForegroundColor $Cyan

Write-Status "Verificando requisitos..." "INFO"

# Verificar Azure CLI
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    Exit-OnError "Azure CLI no está instalado"
}

# Verificar autenticación
$CurrentUser = az account show --query user.name -o tsv 2>$null
if (-not $CurrentUser) {
    Write-Status "Requiere autenticación. Abriendo navegador..." "WARNING"
    az login
}

Write-Status "Autenticado como: $CurrentUser" "SUCCESS"

# ============================================================
# PASO 1: Crear CDN Profile
# ============================================================

Write-Host "`n--- PASO 1: Crear CDN Profile ---`n"

Write-Status "Verificando si CDN Profile existe: $CDNProfileName" "INFO"

$ProfileExists = az cdn profile list `
    --resource-group $ResourceGroupName `
    --query "[?name=='$CDNProfileName'].name" -o tsv

if ($ProfileExists) {
    Write-Status "CDN Profile ya existe: $CDNProfileName" "WARNING"
}
else {
    Write-Status "Creando CDN Profile: $CDNProfileName" "INFO"
    
    try {
        az cdn profile create `
            --name $CDNProfileName `
            --resource-group $ResourceGroupName `
            --sku Standard_Microsoft | Out-Null
        
        Write-Status "CDN Profile creado exitosamente" "SUCCESS"
    }
    catch {
        Exit-OnError "Error al crear CDN Profile: $_"
    }
}

# ============================================================
# PASO 2: Crear CDN Endpoint
# ============================================================

Write-Host "`n--- PASO 2: Crear CDN Endpoint ---`n"

Write-Status "Verificando si CDN Endpoint existe: $CDNEndpointName" "INFO"

$EndpointExists = az cdn endpoint list `
    --profile-name $CDNProfileName `
    --resource-group $ResourceGroupName `
    --query "[?name=='$CDNEndpointName'].name" -o tsv

if ($EndpointExists) {
    Write-Status "CDN Endpoint ya existe: $CDNEndpointName" "WARNING"
}
else {
    Write-Status "Creando CDN Endpoint: $CDNEndpointName" "INFO"
    
    # Obtener URL del Storage Account
    $OriginHostname = "$StorageAccountName.blob.core.windows.net"
    
    try {
        az cdn endpoint create `
            --name $CDNEndpointName `
            --profile-name $CDNProfileName `
            --resource-group $ResourceGroupName `
            --origin $OriginHostname `
            --origin-host-header $OriginHostname | Out-Null
        
        Write-Status "CDN Endpoint creado exitosamente" "SUCCESS"
    }
    catch {
        Exit-OnError "Error al crear CDN Endpoint: $_"
    }
}

# ============================================================
# PASO 3: Obtener URL del CDN
# ============================================================

Write-Host "`n--- PASO 3: URL del CDN ---`n"

$CDNEndpointURL = az cdn endpoint show `
    --name $CDNEndpointName `
    --profile-name $CDNProfileName `
    --resource-group $ResourceGroupName `
    --query hostName -o tsv

$FullCDNURL = "https://$CDNEndpointURL/imgGames"

Write-Status "URL del CDN creada:" "SUCCESS"
Write-Host "  Base: https://$CDNEndpointURL"
Write-Host "  Imágenes: $FullCDNURL"
Write-Host "  Ejemplo: $FullCDNURL/action1.png`n"

# ============================================================
# PASO 4: Esperar a que CDN esté propagado
# ============================================================

Write-Host "`n--- PASO 4: Propagación del CDN ---`n"

Write-Status "El CDN puede tardar 5-10 minutos en propagarse globalmente" "WARNING"
Write-Status "Mientras esperas, puedes:" "INFO"
Write-Host "  1. Actualizar tu archivo .env con la URL del CDN"
Write-Host "  2. Desplegar a Azure Static Web Apps"
Write-Host "  3. El CDN cacheará las imágenes automáticamente`n"

# ============================================================
# PASO 5: Configuración para .env
# ============================================================

Write-Host "--- PASO 5: Configuración para .env ---`n"

Write-Host "Agrega a tu archivo .env:" -ForegroundColor $Cyan
Write-Host "`nPara PRODUCCIÓN (con CDN):"
Write-Host "  REACT_APP_BLOB_STORAGE_URL=https://$CDNEndpointURL" -ForegroundColor $Green
Write-Host "  REACT_APP_CDN_URL=https://$CDNEndpointURL`n" -ForegroundColor $Green

Write-Host "O sin CDN (acceso directo a Blob):" -ForegroundColor $Cyan
Write-Host "  REACT_APP_BLOB_STORAGE_URL=https://$StorageAccountName.blob.core.windows.net`n" -ForegroundColor $Yellow

# ============================================================
# RESUMEN FINAL
# ============================================================

Write-Host "========================================" -ForegroundColor $Cyan
Write-Host "  ✅ CDN Configurado!" -ForegroundColor $Green
Write-Host "========================================`n" -ForegroundColor $Cyan

Write-Host "Resumen:" -ForegroundColor $Cyan
Write-Host "  CDN Profile: $CDNProfileName" -ForegroundColor $Green
Write-Host "  CDN Endpoint: $CDNEndpointName" -ForegroundColor $Green
Write-Host "  CDN URL: https://$CDNEndpointURL" -ForegroundColor $Green
Write-Host "  Caché: 7 días (por defecto)`n" -ForegroundColor $Green

Write-Host "Próximos pasos:" -ForegroundColor $Cyan
Write-Host "  1. Esperar 5-10 minutos para propagación global"
Write-Host "  2. Copiar URL del CDN a .env"
Write-Host "  3. Desplegar a Azure Static Web Apps"
Write-Host "  4. (Opcional) Purgar caché: az cdn endpoint purge ...`n"

Write-Status "¡CDN configurado exitosamente!" "SUCCESS"

# Comando para purgar caché (si necesita actualizar):
Write-Host "Para purgar caché cuando actualices imágenes:" -ForegroundColor $Yellow
Write-Host "  az cdn endpoint purge ``"
Write-Host "    --name $CDNEndpointName ``"
Write-Host "    --profile-name $CDNProfileName ``"
Write-Host "    --resource-group $ResourceGroupName ``"
Write-Host "    --content-paths '/*'`n"
