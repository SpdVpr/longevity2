@echo off
setlocal

echo ===== Nahrávání na GitHub pomocí Git Credential Manager =====
echo.

REM Nastavení nového repozitáře
echo Nastavuji nový repozitář...
git remote set-url origin https://github.com/SpdVpr/longevity2.git

REM Kontrola nastavení
echo Kontroluji nastavení...
git remote -v

REM Nastavení Git Credential Manager
echo Nastavuji Git Credential Manager...
git config --global credential.helper manager

REM Přidání všech souborů
echo Přidávám soubory...
git add .

REM Vytvoření commitu
echo Vytvářím commit...
git commit -m "Initial commit"

REM Nahrání na GitHub
echo Nahrávám na GitHub...
echo Pokud se zobrazí okno pro přihlášení, zadejte své GitHub přihlašovací údaje.
git push -u origin main

REM Kontrola výsledku
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Nahrávání na GitHub bylo úspěšné!
) else (
    echo.
    echo Nahrávání na GitHub selhalo s kódem %ERRORLEVEL%
    echo Zkontrolujte své přihlašovací údaje a připojení k internetu.
)

echo.
pause
endlocal
