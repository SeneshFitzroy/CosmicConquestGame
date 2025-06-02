@echo off
echo Starting Cosmic Conquest Game Server...
echo.
echo The game will be available at:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
cd /d "%~dp0"
python -m http.server 8000
pause
