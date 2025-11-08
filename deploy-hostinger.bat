@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion
title L2 EDUCA - Hostinger Deploy
color 0B

:: ================================================================
:: L2 EDUCA - Deploy to Hostinger (STANDALONE)
:: Version: 1.0.0 - SAFE VERSION
:: ================================================================

set "FRONTEND_DIR=l2-educa"

:DEPLOY_MENU
cls
echo.
echo ================================================================
echo          L2 EDUCA - Deploy to Hostinger
echo ================================================================
echo.
echo  [1] Deploy Frontend to Hostinger
echo  [2] Show Configuration
echo  [3] Edit Configuration
echo  [4] Exit
echo.
echo ================================================================
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto DO_DEPLOY
if "%choice%"=="2" goto SHOW_CONFIG
if "%choice%"=="3" goto EDIT_CONFIG
if "%choice%"=="4" goto EXIT_DEPLOY
echo.
echo Invalid choice. Please try again.
timeout /t 2 >nul
goto DEPLOY_MENU

:DO_DEPLOY
cls
echo.
echo ================================================================
echo          Starting Deployment Process
echo ================================================================
echo.

:: Check PowerShell
powershell -Command "Get-Host" >nul 2>&1
if errorlevel 1 (
    echo ERROR: PowerShell is not available!
    echo.
    pause
    goto DEPLOY_MENU
)

:: Check script
if not exist "%FRONTEND_DIR%\scripts\deploy-to-hostinger.ps1" (
    echo ERROR: Deploy script not found!
    echo.
    pause
    goto DEPLOY_MENU
)

:: Run deployment
powershell -ExecutionPolicy Bypass -File "%FRONTEND_DIR%\scripts\deploy-to-hostinger.ps1" -Action deploy

echo.
pause
goto DEPLOY_MENU

:SHOW_CONFIG
cls
echo.
echo ================================================================
echo          Current Configuration
echo ================================================================
echo.

powershell -ExecutionPolicy Bypass -File "%FRONTEND_DIR%\scripts\deploy-to-hostinger.ps1" -Action config

echo.
pause
goto DEPLOY_MENU

:EDIT_CONFIG
cls
echo.
echo Opening configuration file...
echo.

if exist "%FRONTEND_DIR%\scripts\deploy-config.json" (
    start notepad "%FRONTEND_DIR%\scripts\deploy-config.json"
    echo Configuration file opened in Notepad.
    echo Save and close when done.
) else (
    echo Configuration file not found.
    echo Run deployment first to create it.
)

echo.
pause
goto DEPLOY_MENU

:EXIT_DEPLOY
cls
echo.
echo ================================================================
echo          Thanks for using L2 EDUCA Deploy Tool!
echo ================================================================
echo.
timeout /t 1 >nul
exit

