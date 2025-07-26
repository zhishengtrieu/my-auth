FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

COPY ./prisma ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]