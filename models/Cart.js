const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    product_size_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'product_sizes',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1, // Ensure quantity is at least 1
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
    tableName: 'carts',
    timestamps: false,
    paranoid: true, // Enable soft deletes
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id', 'product_size_id'], // Prevent duplicates
        },
        {
            fields: ['user_id'], // Index for faster queries by user_id
        },
    ],
});

module.exports = Cart;