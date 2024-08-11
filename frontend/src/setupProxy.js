// src/setupProxy.js
import config from './config';

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: `${config.API_BASE_URL_USERS}`,
      changeOrigin: true,
    })
  );

  app.use(
    '/products',
    createProxyMiddleware({
      target: `${config.API_BASE_URL_PRODUCTS}`,
      changeOrigin: true,
    })
  );
};