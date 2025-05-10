@echo off
setlocal

echo ===== Nastavení SSH klíče a nahrání na GitHub =====
echo.

REM Kontrola, zda existuje SSH klíč
if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
    echo SSH klíč již existuje.
) else (
    echo Generuji nový SSH klíč...
    echo Stiskněte Enter pro uložení klíče do výchozího umístění a zadejte heslo (nebo nechte prázdné).
    ssh-keygen -t ed25519 -C "michalvesecky@gmail.com"
)

REM Zobrazení veřejného klíče
echo.
echo Váš veřejný SSH klíč (zkopírujte ho a přidejte na GitHub):
echo.
type "%USERPROFILE%\.ssh\id_ed25519.pub"
echo.

echo Přejděte na https://github.com/settings/ssh/new a přidejte tento klíč.
echo Po přidání klíče stiskněte libovolnou klávesu pro pokračování...
pause >nul

REM Nastavení SSH URL pro repozitář
echo Nastavuji SSH URL pro repozitář...
git remote set-url origin git@github.com:SpdVpr/longevity2.git

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
    echo Zkontrolujte, zda jste správně přidali SSH klíč na GitHub.
)

echo.
pause
endlocal
