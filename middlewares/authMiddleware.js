// middleware/authMiddleware.js
const { auth } = require('express-openid-connect');
require('dotenv').config({ path: './config/config.env' });

// Auth0 configuration
const config = {
    authRequired: false, // Set to true to protect all routes by default
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// Auth0 middleware
const authMiddleware = auth(config);

module.exports = authMiddleware;