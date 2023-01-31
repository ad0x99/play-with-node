# How to run this project

1. Clone this repository

2. Install dependencies

```bash
yarn install
```

3. Add .env

- Add .env file at the root of this project
- Example:

```bash
SESSION_SECRET="this_is_secure_key"
```

4. Start the server

```bash
yarn start
```

5. List of Routes

- [login]('http://localhost:3000/login')
- [logout]('http://localhost:3000/logout')
- [search]('http://localhost:3000/search?q=x&format=json')
- [protected]('http://localhost:3000/protected')
