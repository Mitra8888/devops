#Stage 1 : dependency installation
FROM node:20-alpine AS build

WORKDIR /app


COPY package*.json ./
RUN npm ci --only=production

#Stage 2: final image
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]