@echo off
REM Setup & Run Script for Project-6 (Windows)

echo ========================================
echo 🚀 Project-6 Setup ^& Run Script (Windows)
echo ========================================
echo.

REM Check if PostgreSQL is available
where psql >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL found
) else (
    echo ⚠ PostgreSQL not found. Please ensure PostgreSQL is installed.
    pause
    exit /b 1
)

echo.
echo Choose what to run:
echo 1) Backend only (Spring Boot)
echo 2) Frontend only (Next.js)
echo 3) Both Backend ^& Frontend
echo 4) Setup Backend
echo 5) Setup Frontend
echo 6) Build Backend
echo 7) Build Frontend
echo.

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" (
    echo Starting Backend (Spring Boot)...
    cd project-6-backend
    call mvn spring-boot:run
) else if "%choice%"=="2" (
    echo Starting Frontend (Next.js)...
    cd project-6
    call npm run dev
) else if "%choice%"=="3" (
    echo Starting Backend and Frontend...
    start cmd /k "cd project-6-backend && mvn spring-boot:run"
    timeout /t 3 /nobreak
    start cmd /k "cd project-6 && npm run dev"
    echo Backend: http://localhost:4000
    echo Frontend: http://localhost:3000
) else if "%choice%"=="4" (
    echo Setting up Backend...
    cd project-6-backend
    call mvn clean install
    echo Backend setup complete!
) else if "%choice%"=="5" (
    echo Setting up Frontend...
    cd project-6
    call npm install
    echo Frontend setup complete!
) else if "%choice%"=="6" (
    echo Building Backend...
    cd project-6-backend
    call mvn clean package
    echo Backend build complete!
) else if "%choice%"=="7" (
    echo Building Frontend...
    cd project-6
    call npm run build
    echo Frontend build complete!
) else (
    echo Invalid choice
)

echo.
pause

