#!/bin/bash

# Instalace závislostí
npm install
npm install tailwindcss@latest postcss@latest autoprefixer@latest next-auth@latest

# Generování Prisma klienta
npx prisma generate

# Build Next.js aplikace
npx next build
