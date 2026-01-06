# Configuración para Azure App Service

## Opción Recomendada: Azure App Service (más simple que Functions)

Azure App Service es más adecuado para aplicaciones Express existentes sin necesidad de refactorizar.

### Pasos para Desplegar:

1. **Crear App Service en Azure Portal:**
   - Crear nuevo recurso → Web App
   - Runtime stack: Node.js 18 LTS
   - Plan: Free (F1) o Basic B1

2. **Configurar Variables de Entorno:**
   En Azure Portal → Configuration → Application settings:
   ```
   DB_SERVER=tu-servidor.database.windows.net
   DB_NAME=rentgamer-db
   DB_USER=tu-usuario@tu-servidor
   DB_PASSWORD=tu-contraseña
   DB_PORT=1433
   DB_ENCRYPT=true
   DB_TRUST_CERT=false
   PORT=8080
   NODE_ENV=production
   FRONTEND_URL=https://tu-frontend.azurestaticapps.net
   ```

3. **Desplegar desde Git:**
   - Azure Portal → Deployment Center
   - Conectar repositorio GitHub
   - Branch: main
   - Build provider: App Service build service
   - Folder: backend

4. **Actualizar server.js para Azure:**
   Azure App Service usa el puerto de la variable de entorno PORT automáticamente.

### Alternativa: Azure Functions

Si prefieres Azure Functions (consumption plan), necesitarías:
- Refactorizar cada ruta a una Function individual
- Usar Cosmos DB en lugar de MySQL (o usar MySQL con connection pooling)
- Más complejo pero más económico para tráfico bajo

