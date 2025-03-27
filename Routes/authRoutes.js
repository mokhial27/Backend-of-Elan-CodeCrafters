const express = require('express');
const { requiresAuth } = require('express-openid-connect'); // Import requiresAuth
const authController = require('../Controllers/authController.js'); // Import the controller
const router = express.Router();

// Login route
router.get('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

// Profile route (requires authentication)
router.get('/profile', requiresAuth(), authController.getProfile); // Use requiresAuth



module.exports = router;