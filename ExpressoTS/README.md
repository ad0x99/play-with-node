# Authentication Services - ExpressoTS with MongoDB

-   This is a small demo of the authentication using [ExpressoTS](https://doc.expresso-ts.com/) framework and [MongoDB](https://www.mongodb.com/)

# APIs

| **Name** | **Path**   | **Description**             |
| -------- | ---------- | --------------------------- |
| Sign Up  | `/sign-up` | Create a new account        |
| Sign In  | `/sign-in` | Log user in existed account |

# How to run

1. Install `pnpm` and all dependencies

```sh
# Install pnpm if does not exist
npm install -g pnpm

# Install dependencies
pnpm install
```

2. Add `.env` files

-   We need 2 `.env` files. One file is under `ExpressoTS folder` (means current working directory), and another is under `mongo-entrypoint` folder

```sh
# This config is used in .env file which under ExpressoTS folder
# Application
ENVIRONMENT="Development" #Development, Staging, Production
PORT=4000

# Log System
FILE=general #log file name
FOLDER=logs  #log folder name

# Database Initialization
MONGO_INIT_DATABASE=your_init_database_name
DB_INIT_USERNAME=your_custom_init_username
DB_INIT_PWD=your_custom_init_password

# Database Connection
DB_PROTOCOL="mongodb"
DB_USER="your_database_username"
DB_PASSWORD="your_database_password"
DB_HOST="mongodb"
DB_PORT=":27017"
DB_NAME="your_init_database_name"

```

```sh
# This config is used in .env file which under mongo-entrypoint folder
# Database Initialization
DB_INIT_USERNAME=your_custom_init_username
DB_INIT_PWD=your_custom_init_password

# Database Connection
MONGO_DEFAULT_DB=admin
DB_PROTOCOL="mongodb"
DB_USER="your_database_username"
DB_PASSWORD="your_database_password"
DB_NAME="your_init_database_name"
DB_ROLE=readWrite

```

3. Start the application using Docker

```sh
pnpm run docker
```
