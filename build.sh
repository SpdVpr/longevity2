#!/bin/bash

# Instalace závislostí
npm install

# Generování Prisma klienta
npx prisma generate

# Build Next.js aplikace
next build
