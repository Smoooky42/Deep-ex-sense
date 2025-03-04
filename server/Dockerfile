FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm config set legacy-peer-deps true
RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start"]
