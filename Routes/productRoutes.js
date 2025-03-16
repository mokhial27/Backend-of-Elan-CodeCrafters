const express = require('express');
const router = express.Router();
const { getProductsByCategory } = require('../Controllers/productController.js');
const { getProduct } = require('../Controllers/productController.js')


// Define routes
//router.get('/api/home', getHomepageData); // Homepage route
router.get('/api/categories/:category', getProductsByCategory); // Category-specific route
router.get("/api/products/:id", getProduct);

module.exports = router;
