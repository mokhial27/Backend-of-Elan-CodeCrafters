const express = require('express');
const router = express.Router();
const { getProductsByCategory, getProduct } = require('../Controllers/productController');

router.route('/api/categories/:category')
    .get(getProductsByCategory); // Category-specific route

router.route('/api/products/:id')
    .get(getProduct);

module.exports = router;