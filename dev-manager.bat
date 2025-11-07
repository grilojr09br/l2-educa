@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion enableextensions
title L2 EDUCA - Dev Manager Dashboard
color 0B

:: ================================================================
:: L2 EDUCA Development Manager - Enterprise Edition
:: Version: 2.0.0
:: ================================================================

:: Configuration
set "BACKEND_PORT=3001"
set "FRONTEND_PORT=5173"
set "BACKEND_DIR=l2-educa-backend"
set "FRONTEND_DIR=l2-educa"

:MENU
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║          L2 EDUCA - Dev Manager Dashboard v2.0            ║
echo ║                  Enterprise Edition                        ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo  [1] 🚀 Start Dev Servers
echo  [2] 🛑 Stop All Servers
echo  [3] 🔄 Restart Servers
echo  [4] 🔨 Build Production
echo  [5] 📦 Build and Zip Distribution
echo  [6] 🧹 Clean Install (Remove node_modules)
echo  [7] 📊 Check Server Status
echo  [8] 📝 View Logs Directory
echo  [9] 🔧 Advanced Options
echo  [0] ❌ Exit
echo.
echo ════════════════════════════════════════════════════════════
echo.

set /p choice="Enter your choice (0-9): "

if "%choice%"=="1" goto START_SERVERS
if "%choice%"=="2" goto STOP_SERVERS
if "%choice%"=="3" goto RESTART_SERVERS
if "%choice%"=="4" goto BUILD_PRODUCTION
if "%choice%"=="5" goto BUILD_AND_ZIP
if "%choice%"=="6" goto CLEAN_INSTALL
if "%choice%"=="7" goto CHECK_STATUS
if "%choice%"=="8" goto VIEW_LOGS
if "%choice%"=="9" goto ADVANCED_OPTIONS
if "%choice%"=="0" goto EXIT
echo Invalid choice. Please try again.
timeout /t 2 >nul
goto MENU

:: ================================================================
:: START DEV SERVERS
:: ================================================================
:START_SERVERS
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║           Starting Development Servers...                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

call :CHECK_DIRECTORIES
if errorlevel 1 goto MENU

:: Check if already running
call :CHECK_PORT_IN_USE %BACKEND_PORT%
if "%PORT_IN_USE%"=="1" (
    echo ⚠️  Backend already running on port %BACKEND_PORT%
    set /p kill="Kill existing backend? (Y/N): "
    if /i "!kill!"=="Y" (
        call :KILL_PORT %BACKEND_PORT%
    ) else (
        goto SKIP_BACKEND_START
    )
)

echo 📡 Starting Backend Server...
start /min "L2 EDUCA Backend" cmd /k "cd /d "%CD%\%BACKEND_DIR%" && @echo off && title L2 EDUCA Backend && npm run dev"
timeout /t 2 >nul
echo    ✅ Backend started (Port %BACKEND_PORT%)

:SKIP_BACKEND_START

call :CHECK_PORT_IN_USE %FRONTEND_PORT%
if "%PORT_IN_USE%"=="1" (
    echo ⚠️  Frontend already running on port %FRONTEND_PORT%
    set /p kill="Kill existing frontend? (Y/N): "
    if /i "!kill!"=="Y" (
        call :KILL_PORT %FRONTEND_PORT%
    ) else (
        goto SKIP_FRONTEND_START
    )
)

echo 🌐 Starting Frontend Server...
start /min "L2 EDUCA Frontend" cmd /k "cd /d "%CD%\%FRONTEND_DIR%" && @echo off && title L2 EDUCA Frontend && npm run dev"
timeout /t 2 >nul
echo    ✅ Frontend started (Port %FRONTEND_PORT%)

:SKIP_FRONTEND_START

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║              Servers Started Successfully! ✅              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📡 Backend:  http://localhost:%BACKEND_PORT%
echo 🌐 Frontend: http://localhost:%FRONTEND_PORT%
echo.
echo 💡 Servers are minimized. Check taskbar to view logs.
echo.
pause
goto MENU

:: ================================================================
:: STOP ALL SERVERS
:: ================================================================
:STOP_SERVERS
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║           Stopping All Development Servers...              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

set "STOPPED_COUNT=0"

echo 🔍 Scanning for running servers...
echo.

:: Stop Backend
call :KILL_PORT %BACKEND_PORT% "Backend"
if "%PORT_KILLED%"=="1" set /a STOPPED_COUNT+=1

:: Stop Frontend
call :KILL_PORT %FRONTEND_PORT% "Frontend"
if "%PORT_KILLED%"=="1" set /a STOPPED_COUNT+=1

echo.
if !STOPPED_COUNT! GTR 0 (
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║         Successfully Stopped !STOPPED_COUNT! Server^(s^)! ✅                 ║
    echo ╚════════════════════════════════════════════════════════════╝
) else (
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║              No Running Servers Found                      ║
    echo ╚════════════════════════════════════════════════════════════╝
)

echo.
pause
goto MENU

:: ================================================================
:: RESTART SERVERS
:: ================================================================
:RESTART_SERVERS
echo.
echo 🔄 Restarting servers...
call :STOP_SERVERS_SILENT
timeout /t 2 >nul
goto START_SERVERS

:: ================================================================
:: BUILD PRODUCTION
:: ================================================================
:BUILD_PRODUCTION
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║           Building Production Bundles...                   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

call :CHECK_DIRECTORIES
if errorlevel 1 goto MENU

echo 🏗️  Building Backend...
cd "%BACKEND_DIR%"
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ Backend build failed!
    cd ..
    pause
    goto MENU
)
echo    ✅ Backend built successfully
cd ..

echo.
echo 🏗️  Building Frontend...
cd "%FRONTEND_DIR%"
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ Frontend build failed!
    cd ..
    pause
    goto MENU
)
echo    ✅ Frontend built successfully
cd ..

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║              Build Completed Successfully! ✅              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📁 Backend:  %BACKEND_DIR%\dist\
echo 📁 Frontend: %FRONTEND_DIR%\dist\
echo.
pause
goto MENU

:: ================================================================
:: BUILD AND ZIP
:: ================================================================
:BUILD_AND_ZIP
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         Building Production Distribution...                ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Clean dist directory first
echo 🧹 Cleaning previous builds...
if exist "dist" (
    rmdir /S /Q "dist" 2>nul
)
mkdir "dist"

:: Build first
echo.
echo 🏗️  Step 1/3: Building Backend...
cd "%BACKEND_DIR%"
call npm run build
if errorlevel 1 (
    echo ❌ Backend build failed!
    cd ..
    pause
    goto MENU
)
echo    ✅ Backend built
cd ..

echo.
echo 🏗️  Step 2/3: Building Frontend...
cd "%FRONTEND_DIR%"
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed!
    cd ..
    pause
    goto MENU
)
echo    ✅ Frontend built
cd ..

:: Create production distribution structure
echo.
echo 📦 Step 3/3: Creating production structure...

echo    📁 Copying backend build...
xcopy /E /I /Y "%BACKEND_DIR%\dist" "dist\backend\dist" >nul
xcopy /Y "%BACKEND_DIR%\package.json" "dist\backend\" >nul
xcopy /Y "%BACKEND_DIR%\package-lock.json" "dist\backend\" >nul 2>nul
if exist "%BACKEND_DIR%\.env.example" (
    xcopy /Y "%BACKEND_DIR%\.env.example" "dist\backend\" >nul
)

echo    📁 Copying frontend build...
xcopy /E /I /Y "%FRONTEND_DIR%\dist\*" "dist\frontend\" >nul

echo    📝 Creating deployment documentation...
(
echo # L2 EDUCA - Production Build
echo.
echo **Build Date:** %date% %time%
echo **Version:** 1.0.0
echo.
echo ## 📦 Package Contents
echo.
echo - `backend/` - Backend Node.js application
echo - `frontend/` - Frontend static files
echo.
echo ## 🚀 Hostinger Deployment Guide
echo.
echo ### Step 1: Upload Files
echo.
echo 1. Upload `backend/` folder to your server ^(e.g., `/home/username/l2-educa-backend`^)
echo 2. Upload `frontend/` folder contents to your public_html or domain root
echo.
echo ### Step 2: Backend Setup
echo.
echo ```bash
echo cd /path/to/backend
echo npm install --production
echo ```
echo.
echo Create `.env` file in backend folder:
echo ```env
echo NODE_ENV=production
echo PORT=3001
echo JWT_SECRET=your-secret-key-here
echo SUPABASE_URL=your-supabase-url
echo SUPABASE_ANON_KEY=your-anon-key
echo SUPABASE_SERVICE_KEY=your-service-key
echo ALLOWED_ORIGINS=https://yourdomain.com
echo ```
echo.
echo ### Step 3: Start Backend with PM2
echo.
echo ```bash
echo npm install -g pm2
echo pm2 start dist/app.js --name "l2-educa-backend"
echo pm2 save
echo pm2 startup
echo ```
echo.
echo ### Step 4: Configure Nginx ^(or Apache^)
echo.
echo #### Nginx Example:
echo ```nginx
echo server {
echo     listen 80;
echo     server_name yourdomain.com;
echo     root /path/to/frontend;
echo     index index.html;
echo.
echo     # Frontend - serve static files
echo     location / {
echo         try_files $uri $uri/ /index.html;
echo     }
echo.
echo     # Backend API proxy
echo     location /api/ {
echo         proxy_pass http://localhost:3001;
echo         proxy_http_version 1.1;
echo         proxy_set_header Upgrade $http_upgrade;
echo         proxy_set_header Connection 'upgrade';
echo         proxy_set_header Host $host;
echo         proxy_cache_bypass $http_upgrade;
echo     }
echo }
echo ```
echo.
echo ### Step 5: Database Setup
echo.
echo Run these SQL scripts in Supabase SQL Editor ^(from your dev repo^):
echo 1. `l2-educa-backend/scripts/setup-avatar-storage.sql`
echo 2. `l2-educa-backend/scripts/setup-username-changes.sql`
echo 3. `l2-educa-backend/scripts/fix-avatar-rls-policy.sql`
echo.
echo ### Step 6: SSL Certificate
echo.
echo ```bash
echo # Install Certbot
echo sudo apt install certbot python3-certbot-nginx
echo.
echo # Get certificate
echo sudo certbot --nginx -d yourdomain.com
echo ```
echo.
echo ## 📋 Pre-Deployment Checklist
echo.
echo - [ ] Upload all files to Hostinger
echo - [ ] Install Node.js dependencies in backend folder
echo - [ ] Create and configure backend .env file
echo - [ ] Run Supabase SQL scripts
echo - [ ] Start backend with PM2
echo - [ ] Configure web server ^(Nginx/Apache^)
echo - [ ] Set up SSL certificate
echo - [ ] Test all functionality
echo - [ ] Configure domain DNS
echo.
echo ## 🔍 Verify Deployment
echo.
echo 1. Backend health check: `curl https://yourdomain.com/api/health`
echo 2. Frontend loads correctly in browser
echo 3. User registration/login works
echo 4. Image uploads work
echo 5. All pages accessible
echo.
echo ## 📞 Support
echo.
echo For issues, check:
echo - Backend logs: `pm2 logs l2-educa-backend`
echo - Web server logs: `/var/log/nginx/error.log`
echo - Supabase logs in dashboard
echo.
echo **Happy Deploying! 🚀**
) > "dist\README.md"

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        Production Build Created Successfully! ✅           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📦 Distribution: dist\
echo 📁 Location: %CD%\dist\
echo.
echo 📋 Ready for Hostinger:
echo    ✅ backend\    - Backend Node.js app
echo    ✅ frontend\   - Frontend static files
echo    ✅ README.md   - Deployment guide
echo.
echo 💡 Next Steps:
echo    1. Review dist\README.md for deployment instructions
echo    2. Commit the dist\ folder to your repository
echo    3. Upload to Hostinger following the guide
echo.
pause
goto MENU

:: ================================================================
:: CLEAN INSTALL
:: ================================================================
:CLEAN_INSTALL
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║      Clean Install - Remove All Dependencies               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ⚠️  WARNING: This will delete all node_modules!
echo.
set /p confirm="Continue? (YES to confirm): "
if /i not "%confirm%"=="YES" goto MENU

echo.
echo 🧹 Cleaning Backend...
cd "%BACKEND_DIR%"
if exist "node_modules" (
    echo    Removing node_modules...
    rmdir /S /Q node_modules 2>nul
)
if exist "package-lock.json" del /F /Q package-lock.json 2>nul
echo    Installing...
call npm install
cd ..

echo.
echo 🧹 Cleaning Frontend...
cd "%FRONTEND_DIR%"
if exist "node_modules" (
    echo    Removing node_modules...
    rmdir /S /Q node_modules 2>nul
)
if exist "package-lock.json" del /F /Q package-lock.json 2>nul
echo    Installing...
call npm install
cd ..

echo.
echo ✅ Clean install complete!
echo.
pause
goto MENU

:: ================================================================
:: CHECK STATUS
:: ================================================================
:CHECK_STATUS
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                   Server Status                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

call :CHECK_PORT_IN_USE %BACKEND_PORT%
if "%PORT_IN_USE%"=="1" (
    echo 📡 Backend:  ✅ RUNNING on port %BACKEND_PORT%
) else (
    echo 📡 Backend:  ❌ NOT RUNNING
)

call :CHECK_PORT_IN_USE %FRONTEND_PORT%
if "%PORT_IN_USE%"=="1" (
    echo 🌐 Frontend: ✅ RUNNING on port %FRONTEND_PORT%
) else (
    echo 🌐 Frontend: ❌ NOT RUNNING
)

echo.
echo 🔍 Node.js Processes:
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if errorlevel 1 (
    echo    No Node.js processes running
) else (
    tasklist /FI "IMAGENAME eq node.exe" /FO TABLE 2>nul | findstr /V "INFO:"
)

echo.
echo ════════════════════════════════════════════════════════════
pause
goto MENU

:: ================================================================
:: VIEW LOGS
:: ================================================================
:VIEW_LOGS
cls
echo.
echo 📝 Opening log directories...
if exist "%BACKEND_DIR%\logs" start explorer "%CD%\%BACKEND_DIR%\logs"
if exist "%FRONTEND_DIR%\logs" start explorer "%CD%\%FRONTEND_DIR%\logs"
timeout /t 1 >nul
goto MENU

:: ================================================================
:: ADVANCED OPTIONS
:: ================================================================
:ADVANCED_OPTIONS
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                   Advanced Options                         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo  [1] 🔧 Install Backend Dependencies Only
echo  [2] 🔧 Install Frontend Dependencies Only
echo  [3] 🧪 Run Backend Tests
echo  [4] 🧪 Run Frontend Tests
echo  [5] 📋 Show Environment Info
echo  [6] 🔙 Back to Main Menu
echo.

set /p adv="Enter choice (1-6): "

if "%adv%"=="1" (
    cd "%BACKEND_DIR%" && npm install && cd ..
    pause
    goto ADVANCED_OPTIONS
)
if "%adv%"=="2" (
    cd "%FRONTEND_DIR%" && npm install && cd ..
    pause
    goto ADVANCED_OPTIONS
)
if "%adv%"=="3" (
    cd "%BACKEND_DIR%" && npm test && cd ..
    pause
    goto ADVANCED_OPTIONS
)
if "%adv%"=="4" (
    cd "%FRONTEND_DIR%" && npm test && cd ..
    pause
    goto ADVANCED_OPTIONS
)
if "%adv%"=="5" goto ENV_INFO
if "%adv%"=="6" goto MENU
goto ADVANCED_OPTIONS

:ENV_INFO
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║               Environment Information                      ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 📍 Current Directory: %CD%
echo.
node --version 2>nul && (
    echo ✅ Node.js: 
    node --version
) || (
    echo ❌ Node.js not found
)
echo.
npm --version 2>nul && (
    echo ✅ NPM: 
    npm --version
) || (
    echo ❌ NPM not found
)
echo.
echo 📁 Project Structure:
dir /B /AD 2>nul
echo.
pause
goto ADVANCED_OPTIONS

:: ================================================================
:: HELPER FUNCTIONS
:: ================================================================

:CHECK_PORT_IN_USE
set "PORT_IN_USE=0"
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%~1" ^| findstr "LISTENING" 2^>nul') do (
    set "PORT_IN_USE=1"
    set "PORT_PID=%%a"
    goto :eof
)
goto :eof

:KILL_PORT
set "PORT_KILLED=0"
set "CHECK_PORT=%~1"
set "SERVER_NAME=%~2"

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%CHECK_PORT%" ^| findstr "LISTENING" 2^>nul') do (
    if not "%SERVER_NAME%"=="" (
        echo 🛑 Stopping %SERVER_NAME% Server ^(Port %CHECK_PORT%, PID %%a^)...
    )
    taskkill /F /PID %%a >nul 2>&1
    if !errorlevel! equ 0 (
        if not "%SERVER_NAME%"=="" echo    ✅ %SERVER_NAME% stopped
        set "PORT_KILLED=1"
    ) else (
        if not "%SERVER_NAME%"=="" echo    ⚠️  Failed to stop PID %%a
    )
)

:: Close the CMD windows
if "%PORT_KILLED%"=="1" (
    if "%CHECK_PORT%"=="%BACKEND_PORT%" (
        taskkill /FI "WINDOWTITLE eq L2 EDUCA Backend*" /F >nul 2>&1
    )
    if "%CHECK_PORT%"=="%FRONTEND_PORT%" (
        taskkill /FI "WINDOWTITLE eq L2 EDUCA Frontend*" /F >nul 2>&1
    )
)

if "%PORT_KILLED%"=="0" (
    if not "%SERVER_NAME%"=="" echo    ⚠️  %SERVER_NAME% not running on port %CHECK_PORT%
)
goto :eof

:CHECK_DIRECTORIES
if not exist "%BACKEND_DIR%" (
    echo ❌ Error: Backend directory not found!
    echo    Expected: %CD%\%BACKEND_DIR%
    pause
    exit /b 1
)
if not exist "%FRONTEND_DIR%" (
    echo ❌ Error: Frontend directory not found!
    echo    Expected: %CD%\%FRONTEND_DIR%
    pause
    exit /b 1
)
exit /b 0

:BUILD_PRODUCTION_SILENT
cd "%BACKEND_DIR%"
call npm run build >nul 2>&1
if errorlevel 1 (
    cd ..
    exit /b 1
)
cd ..
cd "%FRONTEND_DIR%"
call npm run build >nul 2>&1
if errorlevel 1 (
    cd ..
    exit /b 1
)
cd ..
exit /b 0

:STOP_SERVERS_SILENT
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%BACKEND_PORT%" ^| findstr "LISTENING" 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%FRONTEND_PORT%" ^| findstr "LISTENING" 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
goto :eof

:: ================================================================
:: EXIT
:: ================================================================
:EXIT
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║           Thanks for using L2 EDUCA Dev Manager!          ║
echo ║                                                            ║
echo ║                    Happy Coding! 🚀                        ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
timeout /t 2 >nul
exit
