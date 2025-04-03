# Stage 1: Build Next Application
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# # Не подходит для Next приложения
# # Stage 2: Serve React Application with Nginx
# FROM nginx:stable-alpine

# COPY --from=build /app/build /usr/share/nginx/html 

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]
