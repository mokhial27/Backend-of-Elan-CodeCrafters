const express = require("express");
const router = express.Router();
const { getUserbyId } = require("../Controllers/User");
const { requiresAuth } = require("express-openid-connect");


// Define routes
router.get("/api/users/me", requiresAuth(), getUserbyId);

module.exports = router;
