// controllers/authController.js
const { requiresAuth } = require('express-openid-connect');

// Login route handler
const login = (req, res) => {
    res.oidc.login({ returnTo: '/profile' });
};

// Logout route handler
const logout = (req, res) => {
    res.oidc.logout({ returnTo: '/' });
};

// Profile route handler
const profile = (req, res) => {
    res.json(req.oidc.user);
};

module.exports = {
    login,
    logout,
    profile,
    requiresAuth,
};