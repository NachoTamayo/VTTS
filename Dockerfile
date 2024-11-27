# Dockerfile

# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Verificar que package.json se ha copiado
RUN ls -la

RUN npm install

COPY . .

# Build de Next para producción
RUN npm run build

# Verificar que todos los archivos se han copiado
RUN ls -la
RUN ls -la .next

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/next.config.js ./next.config.js

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
