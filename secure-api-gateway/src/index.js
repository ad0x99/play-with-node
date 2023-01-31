// @ts-nocheck
const express = require('express');
const session = require('express-session');
const responseTime = require('response-time');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { protect, alwaysAllow } = require('./auth');
const { limiter, proxy } = require('./utils');
const { logger } = require('./logger');
const { serverPort, sessionSecret, proxies } = require('./config');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { login, logout, protected } = require('./controllers');

const app = express();
const store = new session.MemoryStore();

// Middlewares
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

app.use(
  session({
    secret: sessionSecret,
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    store,
  })
);

app.use(limiter);
app.use(responseTime());
app.use(logger);

// Router
app.get('/', (req, res) => {
  res.send('Demo API gateway with Node.js');
});
app.get('/login', login);

/**
 * We loop through proxy config and check if
 * protected value is true then we use protect middleware otherwise pass it anyway
 */
Object.keys(proxies).forEach((path) => {
  const { protected, ...options } = proxies[path];
  const authCheck = protected ? protect : alwaysAllow;

  app.use(path, authCheck, createProxyMiddleware(options));
});

app.get('/logout', protect, logout);
app.get('/protected', protect, protected);

app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});
