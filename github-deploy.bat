@echo off
setlocal

echo ===== Bezpečné nahrávání na GitHub =====
echo.

REM Nastavení proměnné prostředí pro token
echo Pro nahrání na GitHub budete potřebovat token.
echo Token NIKDY neukládejte přímo do skriptu!
echo.
set /p GITHUB_TOKEN=Zadejte váš GitHub token: 

REM Nastavení URL repozitáře s tokenem (bezpečně)
echo Nastavuji repozitář...
git remote set-url origin https://%GITHUB_TOKEN%@github.com/SpdVpr/longevity2.git

REM Přidání všech souborů
echo Přidávám soubory...
git add .

REM Vytvoření commitu
echo Vytvářím commit...
set /p COMMIT_MESSAGE=Zadejte zprávu commitu (nebo stiskněte Enter pro výchozí): 
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Update %date% %time%
git commit -m "%COMMIT_MESSAGE%"

REM Nahrání na GitHub
echo Nahrávám na GitHub...
git push -u origin main

REM Kontrola výsledku
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Nahrávání na GitHub bylo úspěšné!
) else (
    echo.
    echo Nahrávání na GitHub selhalo s kódem %ERRORLEVEL%
    echo Zkontrolujte token a připojení k internetu.
)

REM Vyčištění proměnné s tokenem
set GITHUB_TOKEN=

echo.
pause
endlocal
