// src/config.js
const config = {
    API_BASE_URL_USERS: process.env.REACT_APP_API_BASE_URL_USERS || 'http://localhost:3001',
    API_BASE_URL_PRODUCTS: process.env.REACT_APP_API_BASE_URL_PRODUCTS || 'http://localhost:3002',
  };
  
  export default config;
  