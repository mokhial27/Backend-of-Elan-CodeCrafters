const { auth } = require('express-openid-connect');
require('dotenv').config({ path: './config/config.env' });

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET, // Use client secret as session secret
    clientSecret: process.env.AUTH0_CLIENT_SECRET, // Explicit client secret
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    authorizationParams: {
        response_type: 'code',
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: 'openid profile email update:users read:users',
    },
};

const authMiddleware = auth(config);

module.exports = authMiddleware;