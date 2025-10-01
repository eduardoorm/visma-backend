FROM node:18-alpine AS development

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar el cliente Prisma
RUN npx prisma generate

# Puerto que expondrá la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]