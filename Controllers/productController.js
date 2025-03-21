const { Product, Size } = require('../models'); // Import models

// Controller for homepage data
/*/const getHomepageData = async (req, res) => {
    try {
        // Fetch featured products
        const featuredProducts = await Product.findAll({
            where: { isFeatured: true },
            include: [{ model: Size, attributes: ['size'] }],
        });

        // Fetch navigation data (example)
        const navigation = [
            { category: 'Men', type: 'Top Wear', subType: 'T-Shirt' },
            { category: 'Women', type: 'Top Wear', subType: 'Dress' },
        ];

        // Send response
        res.status(200).json({
            success: true,
            data: {
                featuredProducts,
                navigation,
            },
        });
    } catch (error) {
        console.error('Error fetching homepage data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};/*/
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { type, subType } = req.query;

        const whereClause = { category };
        if (type) whereClause.type = type;
        if (subType) whereClause.subType = subType;

        const products = await Product.findAll({
            where: whereClause,
            include: [
                {
                    model: Size,
                    as: 'sizes', // Ensure this matches the alias used in your association
                    attributes: ['size'], // Include only the 'size' attribute
                    through: { attributes: [] }, // Exclude the join table (ProductSize) attributes
                },
            ],
        });

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching products by category:', error); // Log the error
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Size,
                    as: 'sizes',
                    attributes: ['size'],
                    through: { attributes: [] },
                },
            ],
        });


        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            });
        }

        res.status(200).json({
            success: true,
            data: product,
            message: `Product found!`,
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the product.',
        });
    }
};


module.exports = {
    getProductsByCategory,
    getProduct,
};