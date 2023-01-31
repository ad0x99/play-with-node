const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { rate } = require('./config');

/* Creating a rate limiter that will allow 5 requests per 15 minutes. */
const limiter = rateLimit(rate);

/* Creating a proxy middleware that will forward requests to the http://api.duckduckgo.com/ server. */
const proxy = createProxyMiddleware({
  target: 'http://api.duckduckgo.com/',
  changeOrigin: true,
  pathRewrite: {
    [`^/search`]: '',
  },
});

module.exports = { limiter, proxy };
