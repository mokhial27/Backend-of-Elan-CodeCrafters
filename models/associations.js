const User = require('./User');
const UserAddress = require('./User_Address');
const Product = require('./Products');
const Size = require('./Size');
const ProductSize = require('./ProductSize');
const Order = require('./Order');
const OrderItem = require('./OrderItem ');
const Cart = require('./Cart');

// Define associations

// User Relations
User.hasMany(UserAddress, { foreignKey: 'user_id', as: 'addresses' }); // Alias: 'addresses'
UserAddress.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // Alias: 'user'

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' }); // Alias: 'orders'
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // Alias: 'user'

User.hasMany(Cart, { foreignKey: 'user_id', as: 'userCarts' }); // Alias: 'userCarts'
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' }); // Alias: 'user'

// Product Relations
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' }); // Alias: 'orderItems'
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' }); // Alias: 'product'

Product.belongsToMany(Size, { through: ProductSize, foreignKey: 'product_id', as: 'sizes' }); // Alias: 'sizes'
Size.belongsToMany(Product, { through: ProductSize, foreignKey: 'size_id', as: 'products' }); // Alias: 'products'

Product.hasMany(Cart, { foreignKey: 'product_id', as: 'productCarts' }); // Alias: 'productCarts'
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' }); // Alias: 'product'

// Order Relations
Order.belongsTo(UserAddress, { foreignKey: 'user_address_id', as: 'userAddress' }); // Alias: 'userAddress'
UserAddress.hasMany(Order, { foreignKey: 'user_address_id', as: 'orders' }); // Alias: 'orders'

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' }); // Alias: 'items'
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' }); // Alias: 'order'

// OrderItem Relations
OrderItem.belongsTo(ProductSize, { foreignKey: 'product_size_id', as: 'productSize' }); // Alias: 'productSize'
ProductSize.hasMany(OrderItem, { foreignKey: 'product_size_id', as: 'orderItems' }); // Alias: 'orderItems'

// Cart Relations
Cart.belongsTo(ProductSize, { foreignKey: 'product_size_id', as: 'productSize' }); // Alias: 'productSize'
ProductSize.hasMany(Cart, { foreignKey: 'product_size_id', as: 'cartItems' }); // Alias: 'cartItems'

// Export models and associations
module.exports = {
    User,
    UserAddress,
    Product,
    Size,
    ProductSize,
    Order,
    OrderItem,
    Cart,
};