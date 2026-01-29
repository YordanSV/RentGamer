# Script para ejecutar schema.sql en Azure SQL Database
# Requiere: Azure CLI instalado (az command)

$serverName = "rentgamer-sql.database.windows.net"
$databaseName = "RentGamerDB"
$username = "yordan@rentgamer-sql"
$password = "HolaMundo1234_"
$schemaFile = "database/schema.sql"

Write-Host "🔄 Conectando a Azure SQL Database..."
Write-Host "   Servidor: $serverName"
Write-Host "   Base de datos: $databaseName"
Write-Host ""

# Ejecutar el script SQL usando sqlcmd
# Asegúrate de tener sqlcmd instalado (viene con SQL Server Management Studio)

$sqlcmdCommand = @"
sqlcmd -S $serverName -d $databaseName -U $username -P $password -i "$schemaFile" -N
"@

Invoke-Expression $sqlcmdCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Schema ejecutado exitosamente en Azure SQL Database"
} else {
    Write-Host "❌ Error al ejecutar el schema"
}
