FROM node:17

WORKDIR /app

COPY package*.json ./

COPY prisma /app/prisma/

COPY .env ./

COPY . /app

RUN npm install -g prisma

RUN npx prisma generate

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start:prod"]