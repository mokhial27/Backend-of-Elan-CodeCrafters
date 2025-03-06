const sequelize = require('../config/db');
const { User, UserAddress, Product, Size, ProductSize, Cart, Order, OrderItem } = require('../models/index');

/*/const seedDatabase = async () => {
    try {
        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

        // Sync all tables (use { force: true } to drop and recreate tables)
        await sequelize.sync({ force: true });
        console.log("✅ All tables synced successfully!");

        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
        console.log("✅ Foreign key checks re-enabled.");

        // Create the first user
        const user1 = await User.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword123',
            role: 'user',
        });
        console.log("✅ First user created:", user1.toJSON());

        // Add an address for the first user
        const address1 = await UserAddress.create({
            user_id: user1.id,
            governorate: 'Cairo',
            district: 'Maadi',
            street: '123 Nile St',
            building: 'Tower 5, Apt 12',
            postalCode: '11511',
            country: 'Egypt',
            phone_number: '+201234567890',
            addressType: 'shipping',
        });
        console.log("✅ First address created:", address1.toJSON());

        // Create the second user
        const user2 = await User.create({
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: 'securepassword456',
            role: 'user',
        });
        console.log("✅ Second user created:", user2.toJSON());

        // Add an address for the second user
        const address2 = await UserAddress.create({
            user_id: user2.id,
            governorate: 'Alexandria',
            district: 'Sidi Gaber',
            street: '456 Corniche St',
            building: 'Building 10, Apt 5',
            postalCode: '21511',
            country: 'Egypt',
            phone_number: '+201098765432',
            addressType: 'shipping',
        });
        console.log("✅ Second address created:", address2.toJSON());

        // Create sample sizes
        const sizes = await Size.bulkCreate([
            { size: 'S' },
            { size: 'M' },
            { size: 'L' },
            { size: 'XL' },
        ]);
        console.log("✅ Sizes created:", sizes.map(size => size.toJSON()));

        // Create sample products
        const products = await Product.bulkCreate([
            {
                name: 'Men\'s T-Shirt',
                description: 'A comfortable T-shirt for men.',
                price: 20.00,
                stock: 100,
                category: 'Men',
                type: 'Top Wear',
                subType: 'T-Shirt',
            },
            {
                name: 'Men\'s Jeans',
                description: 'Stylish jeans for men.',
                price: 40.00,
                stock: 50,
                category: 'Men',
                type: 'Bottom Wear',
                subType: 'Jeans',
            },
            {
                name: 'Women\'s Dress',
                description: 'A stylish dress for women.',
                price: 50.00,
                stock: 75,
                category: 'Women',
                type: 'Top Wear',
                subType: 'Dress',
            },
            {
                name: 'Women\'s Shorts',
                description: 'Summer shorts for women.',
                price: 30.00,
                stock: 60,
                category: 'Women',
                type: 'Bottom Wear',
                subType: 'Shorts',
            },
        ]);
        console.log("✅ Products created:", products.map(product => product.toJSON()));

        // Create product sizes
        const productSizes = await ProductSize.bulkCreate([
            { product_id: 1, size_id: 1, stock: 25 }, // Men's T-Shirt - S
            { product_id: 1, size_id: 2, stock: 25 }, // Men's T-Shirt - M
            { product_id: 1, size_id: 3, stock: 25 }, // Men's T-Shirt - L
            { product_id: 1, size_id: 4, stock: 25 }, // Men's T-Shirt - XL
            { product_id: 2, size_id: 1, stock: 10 }, // Men's Jeans - S
            { product_id: 2, size_id: 2, stock: 10 }, // Men's Jeans - M
            { product_id: 2, size_id: 3, stock: 10 }, // Men's Jeans - L
            { product_id: 2, size_id: 4, stock: 10 }, // Men's Jeans - XL
            { product_id: 3, size_id: 1, stock: 15 }, // Women's Dress - S
            { product_id: 3, size_id: 2, stock: 15 }, // Women's Dress - M
            { product_id: 3, size_id: 3, stock: 15 }, // Women's Dress - L
            { product_id: 3, size_id: 4, stock: 15 }, // Women's Dress - XL
            { product_id: 4, size_id: 1, stock: 20 }, // Women's Shorts - S
            { product_id: 4, size_id: 2, stock: 20 }, // Women's Shorts - M
            { product_id: 4, size_id: 3, stock: 20 }, // Women's Shorts - L
            { product_id: 4, size_id: 4, stock: 20 }, // Women's Shorts - XL
        ]);
        console.log("✅ Product sizes created:", productSizes.map(ps => ps.toJSON()));

        // Add items to the cart for the first user
        const cartItems = await Cart.bulkCreate([
            {
                user_id: 1,
                product_id: 1,
                product_size_id: 1, // Men's T-Shirt - S
                quantity: 2,
                price: 20.00,
            },
            {
                user_id: 1,
                product_id: 2,
                product_size_id: 3, // Men's Jeans - L
                quantity: 1,
                price: 40.00,
            },
        ]);
        console.log("✅ Cart items created:", cartItems.map(item => item.toJSON()));

        // Create an order for the first user
        const order = await Order.create({
            user_id: 1,
            user_address_id: 1,
            total_amount: 80.00,
            payment_status: 'paid',
            shipping_method: 'standard',
            status: 'pending',
            created_at: new Date(), // Explicitly set created_at
            updated_at: new Date(), // Explicitly set updated_at
        });
        console.log("✅ Order created:", order.toJSON());

        // Add items to the order
        const orderItems = await OrderItem.bulkCreate([
            {
                order_id: order.id,
                product_id: 1,
                product_size_id: 1, // Men's T-Shirt - S
                quantity: 2,
                price: 20.00,
                discount: 0.00,
            },
            {
                order_id: order.id,
                product_id: 2,
                product_size_id: 3, // Men's Jeans - L
                quantity: 1,
                price: 40.00,
                discount: 0.00,
            },
        ]);
        console.log("✅ Order items created:", orderItems.map(item => item.toJSON()));

        // Fetch the first user with their addresses, cart, and orders
        const user1WithDetails = await User.findOne({
            where: { id: 1 },
            include: [
                { model: UserAddress, as: 'addresses' },
                { model: Cart, as: 'userCarts' },
                {
                    model: Order,
                    as: 'orders',
                    include: [
                        { model: OrderItem, as: 'items' },
                    ],
                },
            ],
        });
        console.log("✅ First user with details:", JSON.stringify(user1WithDetails, null, 2));
    } catch (err) {
        console.error("❌ Error syncing tables or creating records:", err);

        // Log detailed validation errors
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            err.errors.forEach((e) => {
                console.error(`Validation Error: ${e.message}`);
            });
        }
    }
};

module.exports = seedDatabase;/*/