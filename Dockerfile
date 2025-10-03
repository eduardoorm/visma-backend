FROM node:18-alpine AS production

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Dar permisos de ejecución a los scripts de inicio
RUN chmod +x ./start_up.sh

# Puerto que expondrá la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["./start_up.sh"]