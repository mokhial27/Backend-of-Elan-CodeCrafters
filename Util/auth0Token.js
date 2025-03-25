const { ManagementClient } = require('auth0');
const axios = require('axios');
require('dotenv').config();

async function getAuth0Token() {
    try {
        const response = await axios.post(
            `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            {
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                grant_type: 'client_credentials',
                scope: 'update:users read:users'
            },
            { timeout: 5000 }
        );

        if (!response.data.access_token) {
            throw new Error('No access token received from Auth0');
        }

        console.log('✅ Auth0 Management API token obtained');
        return response.data.access_token;
    } catch (error) {
        console.error('❌ Failed to get Auth0 token:', {
            status: error.response?.status,
            error: error.response?.data || error.message
        });
        throw error;
    }
}

async function createAuth0Client() {
    try {
        const token = await getAuth0Token();

        console.log('Initializing Auth0 ManagementClient...');
        const auth0 = new ManagementClient({
            domain: process.env.AUTH0_DOMAIN,
            token: token,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        });

        // Verify the client was created properly
        if (!auth0 || !auth0.users || typeof auth0.users.update !== 'function') {
            throw new Error('Auth0 client not properly initialized');
        }

        console.log('✅ Auth0 ManagementClient ready');
        return auth0;
    } catch (error) {
        console.error('❌ Failed to create Auth0 client:', error);
        throw error;
    }
}

module.exports = createAuth0Client;