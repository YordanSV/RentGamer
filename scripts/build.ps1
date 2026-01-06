# Script PowerShell para construir el proyecto para producción
# Uso: .\scripts\build.ps1

Write-Host "🔨 Construyendo RentGamer para producción..." -ForegroundColor Green
Write-Host ""

# Construir frontend
Write-Host "📦 Construyendo frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build
Set-Location ..

Write-Host ""
Write-Host "✅ Build completado!" -ForegroundColor Green
Write-Host "   Frontend build está en: frontend/build" -ForegroundColor Cyan
Write-Host ""


