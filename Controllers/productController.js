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
        console.log('Request Params:', req.params); // Log request params
        console.log('Request Query:', req.query); // Log request query

        const { category } = req.params; // Get category from URL params
        const { type } = req.query; // Get type from query params (optional)

        console.log('Category:', category); // Log category
        console.log('Type:', type); // Log type (if provided)

        // Build query conditions
        const whereClause = { category };
        if (type) whereClause.type = type;

        console.log('Where Clause:', whereClause); // Log the where clause

        // Fetch products
        const products = await Product.findAll({
            where: whereClause,
            include: [
                {
                    model: Size,
                    as: 'sizes', // Use the alias 'sizes' defined in the association
                    attributes: ['size'], // Include only the 'size' attribute
                    through: { attributes: [] }, // Exclude the join table (ProductSize) attributes
                },
            ],
        });

        console.log('Products:', products); // Log the fetched products

        // Send response
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching products by category:', error); // Log the error
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
// Fetch product with id
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch product details
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Size,
                    as: 'sizes',
                    attributes: ['size'],
                    through: { attributes: [] }, // Exclude join table attributes
                },
            ],
        });

        // If product not found, return 404
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            });
        }

        // If product found, return 200 with product data
        res.status(200).json({
            success: true,
            data: product,
            message: `Product found!`,
        });

    } catch (error) {
        // Handle errors
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the product.',
        });
    }
};
// Export controllers
module.exports = {
    getProductsByCategory,
    getProduct,
};


