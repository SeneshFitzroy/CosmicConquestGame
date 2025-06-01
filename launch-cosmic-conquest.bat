@echo off
echo.
echo ===============================================
echo    🚀 COSMIC CONQUEST - ULTIMATE LAUNCHER 🚀
echo ===============================================
echo.
echo Starting the most advanced version of Cosmic Conquest...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Node.js not found. Opening HTML version instead...
    echo.
    start "" "ULTRA-COSMIC-CONQUEST.html"
    goto :end
)

echo ✅ Node.js detected
echo.
echo Choose your preferred version:
echo.
echo [1] 🌟 ULTRA-COSMIC-CONQUEST.html (Single-file Ultimate Version)
echo [2] 🚀 Next.js React Version (Advanced Components)
echo [3] 📖 View Advanced Features Overview
echo [4] 🎮 Basic HTML Version
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🌟 Launching ULTRA-COSMIC-CONQUEST.html...
    echo This is the MOST ADVANCED version with all features!
    echo.
    start "" "ULTRA-COSMIC-CONQUEST.html"
    goto :end
)

if "%choice%"=="2" (
    echo.
    echo 🚀 Starting Next.js development server...
    echo This version includes 3D components with Three.js
    echo.
    echo Installing dependencies if needed...
    call npm install --silent
    echo.
    echo Starting server at http://localhost:3000
    call npm run dev
    goto :end
)

if "%choice%"=="3" (
    echo.
    echo 📖 Opening Advanced Features Overview...
    start "" "ADVANCED-FEATURES-OVERVIEW.md"
    goto :end
)

if "%choice%"=="4" (
    echo.
    echo 🎮 Launching Basic HTML Version...
    start "" "index.html"
    goto :end
)

echo.
echo ❌ Invalid choice. Launching default ULTRA version...
start "" "ULTRA-COSMIC-CONQUEST.html"

:end
echo.
echo 🎉 Enjoy conquering the cosmos!
echo.
pause
