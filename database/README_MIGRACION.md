# 📦 Guía de Migración de Juegos desde JSON

## 🎯 Objetivo

Migrar los juegos desde `frontend/src/data/games.js` a la base de datos SQL Server.

---

## 📋 Prerrequisitos

1. ✅ Base de datos creada (ejecutar `schema.sql`)
2. ✅ Categorías creadas (ejecutar `seed-data.sql` o el script las creará automáticamente)
3. ✅ Variables de entorno configuradas en `backend/.env`
4. ✅ Dependencias instaladas: `npm install mssql` en backend

---

## 🚀 Cómo Ejecutar

### **Opción 1: Script ES Modules (Recomendado)**

```bash
# Desde la raíz del proyecto
node database/migrate-games-from-json.mjs
```

### **Opción 2: Script CommonJS**

```bash
# Desde la raíz del proyecto
node database/migrate-games-from-json.js
```

---

## 📝 Qué Hace el Script

1. **Lee los juegos** desde `frontend/src/data/games.js`
2. **Conecta a SQL Server** usando las variables de entorno
3. **Mapea categorías:**
   - "Acción" → "Action"
   - "Aventura" → "Adventure"
   - "Estrategia" → "Strategy"
4. **Crea categorías faltantes** si no existen
5. **Verifica duplicados** - No inserta juegos que ya existen
6. **Inserta juegos** con:
   - Nombre
   - Categoría (ID)
   - Precio
   - Imagen (ruta: `/imgGames/...`)
   - Descripción
   - Stock (10 por defecto)

---

## 📊 Ejemplo de Salida

```
🔄 Iniciando migración de juegos...

📦 Total de juegos a migrar: 21

📡 Conectando a SQL Server...
✅ Conectado exitosamente

✅ Insertado: "Fuego Mortal" (ID: 1)
✅ Insertado: "El Reino Olvidado" (ID: 2)
⏭️  Saltando "Fuego Mortal" (ya existe)
...

========================================
📊 Resumen de migración:
   ✅ Insertados: 20
   ⏭️  Saltados: 1
   ❌ Errores: 0
   📦 Total procesados: 21
========================================

🔌 Conexión cerrada
✅ Migración completada
```

---

## 🔍 Verificar Resultados

### **En SQL Server:**

```sql
-- Ver todos los juegos insertados
SELECT g.id, g.name, c.name as category, g.price, g.image
FROM Games g
INNER JOIN Categories c ON g.category_id = c.id
ORDER BY g.id;

-- Contar juegos por categoría
SELECT c.name as category, COUNT(g.id) as total
FROM Categories c
LEFT JOIN Games g ON c.id = g.category_id
GROUP BY c.name;
```

---

## 🐛 Troubleshooting

### **Error: "Cannot find module 'mssql'"**
```bash
cd backend
npm install mssql
```

### **Error: "Login failed for user"**
- Verificar variables de entorno en `backend/.env`
- Verificar usuario y contraseña de SQL Server

### **Error: "Cannot connect to server"**
- Verificar que SQL Server esté corriendo
- Verificar firewall
- Verificar puerto (1433 por defecto)

### **Error: "Invalid object name 'Games'"**
- Ejecutar `schema.sql` primero para crear las tablas

### **Error: "Cannot find module '../frontend/src/data/games.js'"**
- Verificar que estás ejecutando desde la raíz del proyecto
- Verificar que el archivo existe

---

## 📝 Notas

1. **Rutas de Imágenes:**
   - Las rutas se guardan tal cual: `/imgGames/action1.png`
   - Estas rutas funcionan con `public/imgGames/` en desarrollo
   - También funcionan con Azure Static Web Apps en producción

2. **Duplicados:**
   - El script verifica por nombre
   - Si un juego ya existe, lo salta
   - Puedes ejecutar el script múltiples veces sin problemas

3. **Stock:**
   - Por defecto se asigna stock = 10
   - Puedes actualizarlo manualmente después

4. **Categorías:**
   - Si una categoría no existe, el script la crea automáticamente
   - El mapeo convierte nombres en español a inglés

---

## 🔄 Re-ejecutar Migración

Si necesitas re-ejecutar:

1. **Eliminar juegos existentes:**
   ```sql
   DELETE FROM Games;
   ```

2. **Ejecutar script de nuevo:**
   ```bash
   node database/migrate-games-from-json.mjs
   ```

---

## ✅ Checklist

- [ ] Base de datos creada (`schema.sql` ejecutado)
- [ ] Variables de entorno configuradas
- [ ] Dependencias instaladas (`mssql`)
- [ ] Script ejecutado exitosamente
- [ ] Juegos verificados en la base de datos
- [ ] Imágenes accesibles en `public/imgGames/`

---

**¡Listo! Tus juegos ahora están en la base de datos SQL Server** 🎮


