const { requiresAuth } = require('express-openid-connect');
const User = require('../models/User'); // Import your User model

console.log('User model:', User); // Debug: Log the User model

// Login route handler
const login = (req, res) => {
    res.oidc.login({ returnTo: '/profile' });
};

// Logout route handler
const logout = (req, res) => {
    res.oidc.logout({ returnTo: '/' });
};
const getProfile = async (req, res) => {
    try {
        console.log('User info from Auth0:', req.oidc.user);

        if (!req.oidc.user) {
            console.error('No user found in req.oidc');
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { sub, email, name } = req.oidc.user;

        // Save or update user in MySQL
        await User.findOrCreate({
            where: { email },
            defaults: {
                auth0_id: sub,
                name,
                email,
                role: 'user',
            },
        });

        // Send a simple success response without returning user data
        res.status(200).json({ message: 'User saved or already exists' });
    } catch (err) {
        console.error('❌ Error in getProfile:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};


module.exports = {
    login,
    logout,
    getProfile,

};