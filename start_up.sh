#!/bin/sh

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running database seeds..."
npx prisma db seed

echo "Building the application..."
npm run build

echo "Starting application in production mode..."
npm run start:prod
