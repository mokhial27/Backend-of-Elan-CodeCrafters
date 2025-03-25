const { ManagementClient } = require('auth0');
const getAuth0Token = require('./auth0Token'); // استيراد دالة جلب التوكن
async function createAuth0Client() {
    try {
        const token = await getAuth0Token();
        console.log('✅ Auth0 Token:', token ? 'Received' : 'Missing!'); // Check if token exists

        const auth0 = new ManagementClient({
            domain: process.env.AUTH0_DOMAIN,
            token,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        });

        console.log('✅ Auth0 Client Created:', auth0 ? 'Success' : 'Failed!');
        return auth0;
    } catch (error) {
        console.error('❌ Auth0 Client Creation FAILED:', error.message);
        throw error; // Re-throw to see the error in updateProfile
    }
}
module.exports = createAuth0Client;
