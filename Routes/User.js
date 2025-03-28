const express = require("express");
const router = express.Router();
const { getUserbyId, createAddress, updateProfile } = require("../Controllers/User");
const { requiresAuth } = require("express-openid-connect");


// Define routes
router.get("/api/users/me", requiresAuth(), getUserbyId);
// Create a new address
router.post('/addresses', createAddress);
//update user email and name
router.put('/profile', requiresAuth(), updateProfile);
module.exports = router;



