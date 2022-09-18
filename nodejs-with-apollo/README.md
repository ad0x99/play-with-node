# How to run this project

1. Clone this repository

2. Install dependencies

```bash
yarn install
```

3. Setup Local Database

- Install [Docker](https://www.docker.com/) on your machine

- Make permission for `script.sh` and run it. (This bash file will check your Docker daemon is running or not. If Docker is not running, then it'll automatically run Docker for you, otherwise it'll run postgres container)

```bash
chmod +x script.sh
./script.sh
```

4. Prisma Setup

- Install Prisma

```bash
npm i -g prisma
```

- Generate Prisma artifacts

```bash
prisma generate
```

- Push Prisma models to database

```bash
prisma db push
```

5. Start the application

- After your Docker container is started
- Then run this command to start the application

```bash
yarn start
```
