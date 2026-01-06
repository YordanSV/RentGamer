#!/bin/bash

# Script para ejecutar el proyecto localmente
# Uso: ./scripts/dev-local.sh

echo "🚀 Iniciando RentGamer en modo desarrollo..."
echo ""

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instálalo primero."
    exit 1
fi

# Instalar dependencias si no existen
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend && npm install && cd ..
fi

# Verificar archivos .env
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Advertencia: backend/.env no existe. Crea uno basado en backend/.env.example"
fi

# Iniciar servidores
echo ""
echo "✅ Iniciando servidores..."
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:3000"
echo ""

# Usar concurrently si está disponible, sino iniciar en paralelo
if command -v npx &> /dev/null; then
    npx concurrently "npm run dev:backend" "npm run dev:frontend"
else
    echo "⚠️  concurrently no está disponible. Instalando..."
    npm install concurrently --save-dev
    npx concurrently "npm run dev:backend" "npm run dev:frontend"
fi


