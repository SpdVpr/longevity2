@echo off
setlocal

echo ===== Nahrávání na GitHub pomocí Git Credential Manager =====
echo.

REM Nastavení URL repozitáře bez tokenu
git remote set-url origin https://github.com/SpdVpr/longevity.git

REM Ujistíme se, že je nastaven Git Credential Manager
git config --global credential.helper manager

REM Přidání všech změn
echo Přidávám změny...
git add .

REM Vytvoření commitu
echo Vytvářím commit...
set /p COMMIT_MESSAGE=Zadejte zprávu commitu (nebo stiskněte Enter pro výchozí): 
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Update %date% %time%
git commit -m "%COMMIT_MESSAGE%"

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
