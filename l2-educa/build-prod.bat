@echo off
echo ============================================
echo L2 EDUCA - Production Build
echo ============================================
echo.

REM Clean dist folder
echo Cleaning old build...
if exist dist (
    rmdir /s /q dist 2>nul
    timeout /t 1 >nul 2>&1
)

REM Set environment variables for production build
echo Setting environment variables...
set VITE_BACKEND_URL=https://l2-educa-production.up.railway.app
set VITE_SUPABASE_URL=https://usyqgsgdsppthjmvyjxf.supabase.co
set VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeXFnc2dkc3BwdGhqbXZ5anhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODgzOTgsImV4cCI6MjA3Nzk2NDM5OH0.A9QBFHK3EJFuXXUtQSSoDTiIp2opr0xtoLVA__JEpfc
set VITE_OPENROUTER_API_KEYS=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,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,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,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
set VITE_OPENROUTER_MODEL=minimax/minimax-m2:free

echo.
echo Building...
REM Run build
npm run build

echo.
echo ============================================
echo Build complete! Files are in dist/ folder
echo ============================================
pause

