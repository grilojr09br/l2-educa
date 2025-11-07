@echo off
echo =======================================
echo CORRIGINDO TELA BRANCA - L2 EDUCA
echo =======================================
echo.

echo [1/3] Parando servidor existente...
echo Por favor, pressione Ctrl+C no terminal do servidor se estiver rodando
timeout /t 3 >nul

echo.
echo [2/3] Limpando cache do Vite...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Cache removido!
) else (
    echo Cache ja estava limpo!
)

echo.
echo [3/3] Iniciando servidor...
echo.
npm run dev -- --force

pause

