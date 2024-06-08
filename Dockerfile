#Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

#Production stage
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production --legacy-peer-deps

COPY --from=build /app/dist ./dist

CMD ["node", "dist/app.js"]