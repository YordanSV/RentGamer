# Script PowerShell para ejecutar el proyecto localmente en Windows
# Uso: .\scripts\dev-local.ps1

Write-Host "🚀 Iniciando RentGamer en modo desarrollo..." -ForegroundColor Green
Write-Host ""

# Verificar que Node.js esté instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Verificar que npm esté instalado
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Instalar dependencias si no existen
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Verificar archivos .env
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  Advertencia: backend\.env no existe. Crea uno basado en backend\.env.example" -ForegroundColor Yellow
}

# Iniciar servidores
Write-Host ""
Write-Host "✅ Iniciando servidores..." -ForegroundColor Green
Write-Host "   Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

# Iniciar backend en una ventana
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Esperar un poco para que el backend inicie
Start-Sleep -Seconds 2

# Iniciar frontend
Set-Location frontend
npm run start


