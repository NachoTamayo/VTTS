# /app/Dockerfile

# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3333

# Comando para iniciar la aplicación
CMD ["npm", "start"]