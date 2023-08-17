FROM node:18

WORKDIR /app

COPY . /app

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 4000

CMD ["pnpm", "run", "dev"]