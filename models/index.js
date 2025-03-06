// models/index.js
const User = require('./User');
const UserAddress = require('./User_Address');
const Product = require('./Products');
const Size = require('./Size');
const ProductSize = require('./ProductSize');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem ');

// Import associations
require('./associations');

// Export all models
module.exports = {
    User,
    UserAddress,
    Product,
    Size,
    ProductSize,
    Cart,
    Order,
    OrderItem,
};