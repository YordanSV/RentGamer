# Configuración de la URL del microservicio de Juegos

Para que el backend principal consuma el microservicio de Juegos, debes definir la variable de entorno `GAMES_API_URL` en Azure:

1. Ve al portal de Azure y selecciona tu App Service principal (rentgamer-api).
2. En el menú lateral, haz clic en "Configuración" > "Configuración de la aplicación".
3. Haz clic en "+ Nuevo valor de configuración".
4. Nombre: `GAMES_API_URL`
   Valor: `https://<tu-microservicio>.azurewebsites.net/api/games`
5. Guarda los cambios y reinicia el App Service si es necesario.

El backend principal ahora usará esta URL para todas las operaciones de juegos.

Puedes cambiar el valor de la variable en cualquier momento para apuntar a otro microservicio o entorno.
