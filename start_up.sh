#!/bin/sh

# Ejecutar migraciones de Prisma en producción
npx prisma migrate deploy

# Ejecutar semillas de datos (si está configurado en package.json)
npx prisma db seed

# Generar el cliente de Prisma
npx prisma generate

# Iniciar la aplicación en modo producción
npm run start:prod
