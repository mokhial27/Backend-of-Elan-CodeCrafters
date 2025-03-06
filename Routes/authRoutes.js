// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, logout, profile, requiresAuth } = require('../Controllers/authController.js');

// Login route
router.get('/login', login);

// Logout route
router.get('/logout', logout);

// Profile route (protected)
router.get('/profile', requiresAuth(), profile);

module.exports = router;