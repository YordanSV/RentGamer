-- Script para actualizar las URLs de imágenes a Azure Blob Storage
-- Convierte rutas locales /img-games/... a URLs completas de Azure

-- Verificar las URLs actuales antes de actualizar
SELECT id, name, image as current_image
FROM Games
WHERE image LIKE '/img-games/%'
ORDER BY id;

-- Actualizar las URLs a Azure Blob Storage
UPDATE Games
SET image = REPLACE(image, '/img-games/', 'https://rentgamerstorage.blob.core.windows.net/img-games/')
WHERE image LIKE '/img-games/%';

-- Verificar las URLs actualizadas
SELECT id, name, image as updated_image
FROM Games
ORDER BY id;

-- Resumen de cambios
SELECT 
    COUNT(*) as total_games,
    SUM(CASE WHEN image LIKE 'https://%' THEN 1 ELSE 0 END) as with_azure_urls,
    SUM(CASE WHEN image LIKE '/img-games/%' THEN 1 ELSE 0 END) as with_local_urls
FROM Games;
