const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductSize = sequelize.define('ProductSize', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sizes',
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'product_sizes',
    timestamps: false,
    paranoid: true, // Enable soft deletes
    indexes: [
        {
            fields: ['product_id'], // Index for faster queries by product_id
        },
        {
            fields: ['size_id'], // Index for faster queries by size_id
        },
    ],
});

module.exports = ProductSize;