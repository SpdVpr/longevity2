@echo off
setlocal

echo ===== Nahrávání na nový GitHub repozitář =====
echo.

REM Nastavení nového repozitáře
echo Nastavuji nový repozitář...
git remote set-url origin https://github.com/SpdVpr/longevity2.git

REM Kontrola nastavení
echo Kontroluji nastavení...
git remote -v

REM Přidání všech souborů
echo Přidávám soubory...
git add .

REM Vytvoření commitu
echo Vytvářím commit...
git commit -m "Initial commit"

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

    echo.
    echo Zkouším alternativní metodu s tokenem...

    REM Nastavení GitHub tokenu
    set TOKEN=YOUR_GITHUB_TOKEN_HERE

    REM Nastavení URL repozitáře s tokenem
    git remote set-url origin https://%TOKEN%@github.com/SpdVpr/longevity2.git

    REM Nahrání na GitHub
    git push -u origin main

    if %ERRORLEVEL% EQU 0 (
        echo.
        echo Nahrávání na GitHub bylo úspěšné s tokenem!
    ) else (
        echo.
        echo Nahrávání na GitHub selhalo i s tokenem.

        echo.
        echo Zkouším třetí metodu s uživatelským jménem a tokenem...

        REM Nastavení URL repozitáře s uživatelským jménem a tokenem
        git remote set-url origin https://SpdVpr:%TOKEN%@github.com/SpdVpr/longevity2.git

        REM Nahrání na GitHub
        git push -u origin main

        if %ERRORLEVEL% EQU 0 (
            echo.
            echo Nahrávání na GitHub bylo úspěšné s uživatelským jménem a tokenem!
        ) else (
            echo.
            echo Všechny metody selhaly. Zkuste použít Git Credential Manager nebo SSH klíč.
        )
    )
)

echo.
pause
endlocal
