@echo off
setlocal

echo ===== Uložení přihlašovacích údajů do Git Credential Manager =====
echo.

REM Nastavení nového tokenu
set TOKEN=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

REM Nastavení nového repozitáře
echo Nastavuji nový repozitář...
git remote set-url origin https://github.com/SpdVpr/longevity2.git

REM Kontrola nastavení
echo Kontroluji nastavení...
git remote -v

REM Nastavení Git Credential Manager
echo Nastavuji Git Credential Manager...
git config --global credential.helper manager

REM Uložení přihlašovacích údajů
echo Ukládám přihlašovací údaje...
echo url=https://github.com > git_credentials.txt
echo username=SpdVpr >> git_credentials.txt
echo password=%TOKEN% >> git_credentials.txt

REM Použití uložených přihlašovacích údajů
echo Používám uložené přihlašovací údaje...
git credential approve < git_credentials.txt

REM Odstranění dočasného souboru
del git_credentials.txt

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
    echo Zkontrolujte své přihlašovací údaje a připojení k internetu.
)

echo.
pause
endlocal
