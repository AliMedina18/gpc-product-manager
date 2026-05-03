#!/bin/bash

echo "🚀 GPC Product Manager - Setup Inicial"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"

# Backend
echo ""
echo "📦 Instalando Backend..."
cd backend
npm install
npm run db:generate
cd ..

# Frontend
echo ""
echo "📦 Instalando Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Instalación completada!"
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1️⃣  Inicia PostgreSQL (opción: docker-compose up -d)"
echo "2️⃣  Ejecuta las migraciones: cd backend && npx prisma migrate dev"
echo "3️⃣  Importa datos GPC: cd backend && npm run import:gpc"
echo "4️⃣  Inicia el backend: cd backend && npm run dev"
echo "5️⃣  En otra terminal, inicia el frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend disponible en: http://localhost:5173"
echo "🔧 Backend disponible en: http://localhost:3000"
echo ""
