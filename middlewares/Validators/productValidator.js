// middlewares/validators/productValidator.js
const { param, query } = require('express-validator');

const validateProductId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID must be a positive integer')
        .toInt() // Auto-convert to number
];

const validateCategoryParams = [
    param('category')
        .trim()
        .toLowerCase()
        .isIn(['men', 'women']).withMessage('Category must be "Men" or "Women"'),
    query('type')
        .optional()
        .trim()
        .isString().withMessage('Type must be a string')
        .notEmpty().withMessage('Type cannot be empty')
        .toUpperCase(),
    //.toLowerCase(),
    query('subType')
        .optional()
        .trim()
        .isString()
        .notEmpty()
        .toLowerCase()
];



module.exports = {
    validateProductId,
    validateCategoryParams,
}