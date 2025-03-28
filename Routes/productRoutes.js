const express = require('express');
const router = express.Router();
const { getProductsByCategory, getProduct } = require('../Controllers/productController');
const { validateProductId, validateCategoryParams } = require('../middlewares/Validators/productValidator')


router.route('/api/categories/:category')
    .get(validateCategoryParams, getProductsByCategory); // Category-specific route

router.route('/api/products/:id')
    .get(validateProductId, getProduct);

module.exports = router;