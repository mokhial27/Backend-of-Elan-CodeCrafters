const sequelize = require('../config/db');
const { Product, Size, ProductSize } = require('../models/index');
const fs = require('fs');

const seedDatabase = async () => { 
    try {
      
        const sizes = await Size.bulkCreate([
            { size: 'XS' },
            { size: 'S' },
            { size: 'M' },
        ], { ignoreDuplicates: true });

        // Read the products from the JSON file
        const productsData = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

        // Create products
        for (const productData of productsData) {
            const product = await Product.create({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                originalPrice: productData.originalPrice,
                image: productData.image,
                category: productData.category,
                type: productData.type,
                subType: productData.subType,
            });

            // Associate product with sizes
            const sizeRecords = await Size.findAll({
                where: { size: productData.sizes },
            });
            await product.addSizes(sizeRecords);
        }

        console.log('✅ Products seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
};

module.exports = seedDatabase;
