FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps true

COPY . .

RUN npm install -g prisma

RUN npx prisma generate

# RUN npx prisma db seed    # для заполнения БД при деплое

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
