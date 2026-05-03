@echo off
echo 🚀 GPC Product Manager - Setup Inicial
echo ==========================================
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instálalo primero.
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Backend
echo 📦 Instalando Backend...
cd backend
call npm install
call npm run db:generate
cd ..

REM Frontend
echo.
echo 📦 Instalando Frontend...
cd frontend
call npm install
cd ..

echo.
echo ✅ Instalación completada!
echo.
echo 📝 Próximos pasos:
echo.
echo 1️⃣  Inicia PostgreSQL (opción: docker-compose up -d)
echo 2️⃣  Ejecuta las migraciones: cd backend && npx prisma migrate dev
echo 3️⃣  Importa datos GPC: cd backend && npm run import:gpc
echo 4️⃣  Inicia el backend: npm run dev
echo 5️⃣  En otra terminal, inicia el frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 Frontend disponible en: http://localhost:5173
echo 🔧 Backend disponible en: http://localhost:3000
echo.
pause
