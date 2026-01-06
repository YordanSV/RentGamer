#!/bin/bash

# Script para construir el proyecto para producción
# Uso: ./scripts/build.sh

echo "🔨 Construyendo RentGamer para producción..."
echo ""

# Construir frontend
echo "📦 Construyendo frontend..."
cd frontend
npm run build
cd ..

echo ""
echo "✅ Build completado!"
echo "   Frontend build está en: frontend/build"
echo ""


