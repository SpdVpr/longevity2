#!/bin/bash

# Záloha původních souborů
echo "Backing up original files"
cp package.json package.json.bak
cp app/globals.css app/globals.css.bak

# Použití minimálních souborů
echo "Using minimal files"
cp minimal-package.json package.json
cp minimal-global.css app/globals.css

# Instalace závislostí
echo "Installing dependencies"
npm install
npm install @auth/prisma-adapter@latest --force

# Generování Prisma klienta
echo "Generating Prisma client"
npx prisma generate

# Výpis nainstalovaných balíčků
echo "Installed packages:"
npm list @prisma/client @auth/prisma-adapter next-auth react-icons

# We're now including Tailwind CSS in the dependencies
echo "Keeping Tailwind CSS references"

# Build Next.js aplikace
echo "Building Next.js application"
npx next build

# Obnovení původních souborů
echo "Restoring original files"
mv package.json.bak package.json
mv app/globals.css.bak app/globals.css
