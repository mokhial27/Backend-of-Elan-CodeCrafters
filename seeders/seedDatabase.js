const sequelize = require('../config/db');
const { Product, Size, ProductSize } = require('../models/index');
const fs = require('fs');
/*/const seedDatabase = async () => {
    try {
        // Clear the ProductSize table to avoid duplicates
        await ProductSize.destroy({ where: {} });

        // Create sizes (if they don't already exist)
        const sizes = await Size.bulkCreate([
            { size: 'XS' },
            { size: 'S' },
            { size: 'M' },
        ], { ignoreDuplicates: true });

        console.log('✅ Sizes seeded successfully!');

        // Read the products from the JSON file
        const productsData = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

        // Create products
        for (const productData of productsData) {
            const product = await Product.create({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                category: productData.category,
                type: productData.type,
                subType: productData.subType,
                image: productData.image,
            });

            console.log(`✅ Product created: ${product.name} (ID: ${product.id})`);

            // Find the size records for the product (ensure unique sizes)
            const uniqueSizes = [...new Set(productData.sizes)]; // Remove duplicates
            const sizeRecords = await Size.findAll({
                where: { size: uniqueSizes },
            });

            console.log(`📏 Unique sizes found for ${product.name}:`, sizeRecords.map(size => size.size));

            // Associate the product with the sizes using the ProductSize table
            await product.addSizes(sizeRecords);

            console.log(`🔗 Associated ${product.name} with sizes:`, sizeRecords.map(size => size.size));
        }

        console.log('✅ Products seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
};

module.exports = seedDatabase;/*/