@echo off
setlocal

echo ===== Nahrávání na GitHub =====
echo.

REM Nastavení GitHub tokenu
set TOKEN=YOUR_GITHUB_TOKEN_HERE

REM Nastavení URL repozitáře s tokenem
git remote set-url origin https://%TOKEN%@github.com/SpdVpr/longevity.git

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
git push -u origin main

REM Kontrola výsledku
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Nahrávání na GitHub bylo úspěšné!
) else (
    echo.
    echo Nahrávání na GitHub selhalo s kódem %ERRORLEVEL%
    echo Zkouším znovu s jiným formátem URL...

    REM Zkusíme jiný formát URL
    git remote set-url origin https://SpdVpr:%TOKEN%@github.com/SpdVpr/longevity.git
    git push -u origin main

    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Nahrávání na GitHub bylo úspěšné při druhém pokusu!
    ) else (
        echo.
        echo Nahrávání na GitHub selhalo i při druhém pokusu.
        echo Zkontrolujte token a připojení k internetu.
    )
)

echo.
pause
endlocal
