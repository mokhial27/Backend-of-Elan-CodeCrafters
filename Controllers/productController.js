const { Product, Size } = require('../models'); // Import models
const { AppError } = require('../Util/AppError');
const { SUCCESS, FAIL, ERROR } = require('../Util/HttpStatus.');
const asyncWrapper = require('../middlewares/asyncwrapper');


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


const getProductsByCategory = asyncWrapper(async (req, res) => {
    const { category } = req.params;
    const { type, subType } = req.query;


    if (!category) {
        throw new AppError('Category is required', 400, FAIL);
    }

    const whereClause = { category };
    if (type) whereClause.type = type;
    if (subType) whereClause.subType = subType;

    // Fetch products
    const products = await Product.findAll({
        where: whereClause,
        include: [
            {
                model: Size,
                as: 'sizes',
                attributes: ['size'],
                through: { attributes: [] },
            },
        ],
    });

    // Send response
    res.status(200).json({
        status: SUCCESS,
        data: products,
        message: 'Products fetched successfully',
    });
});


const getProduct = asyncWrapper(async (req, res, next) => {
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

    if (!product) throw new AppError('Product not found!', 404, FAIL);

    res.status(200).json({
        status: SUCCESS, data: product, message: 'Product found!',
    });
});

module.exports = {
    getProductsByCategory,
    getProduct,
};