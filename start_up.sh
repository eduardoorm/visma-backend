#!/bin/sh

# Generar el cliente de Prisma primero (antes de compilar)
npx prisma generate

# Ejecutar migraciones de Prisma en producción
npx prisma migrate deploy

# Ejecutar semillas de datos (si está configurado en package.json)
npx prisma db seed

# Compilar la aplicación
npm run build

# Iniciar la aplicación en modo producción
npm run start:prod
