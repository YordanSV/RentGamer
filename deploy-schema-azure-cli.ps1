# Alternativa: Usar Azure CLI para ejecutar el SQL
# Primero, asegúrate de tener Azure CLI instalado: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

$serverName = "rentgamer-sql"
$databaseName = "RentGamerDB"
$resourceGroup = "RentGamer_group"  # Cambia esto si tu grupo de recursos es diferente
$schemaFile = "database/schema.sql"

Write-Host "🔄 Conectando a Azure SQL Database con Azure CLI..."
Write-Host "   Servidor: $serverName"
Write-Host "   Base de datos: $databaseName"
Write-Host "   Grupo de recursos: $resourceGroup"
Write-Host ""

# Leer el contenido del archivo SQL
$sqlContent = Get-Content -Path $schemaFile -Raw

# Ejecutar el SQL en Azure
# Nota: Asegúrate de que el usuario tenga permisos en Azure

Write-Host "Ejecutando schema.sql..."
az sql db query --database $databaseName --server $serverName --resource-group $resourceGroup --username "yordan@rentgamer-sql" --password "HolaMundo1234_" --query-file $schemaFile

Write-Host ""
Write-Host "✅ Intenta ejecutar manualmente si Azure CLI no está instalado:"
Write-Host "   En Azure Portal: SQL Databases > RentGamerDB > Query editor"
Write-Host "   O usa Azure Data Studio con tu conexión Azure SQL"
