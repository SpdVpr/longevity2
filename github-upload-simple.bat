@echo off
setlocal

echo ===== Jednoduché nahrávání na GitHub =====
echo.

REM Nastavení GitHub tokenu
set TOKEN=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

REM Nastavení URL repozitáře s tokenem
git remote set-url origin https://%TOKEN%@github.com/SpdVpr/longevity.git

REM Přidání všech změn
echo Přidávám změny...
git add .

REM Vytvoření commitu
echo Vytvářím commit...
git commit -m "Update %date% %time%"

REM Nahrání na GitHub
echo Nahrávám na GitHub...
git push -u origin main

echo.
echo Hotovo! Stiskněte libovolnou klávesu pro ukončení...
pause >nul
endlocal
