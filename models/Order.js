const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
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
    user_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_address',
            key: 'id',
        },
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01, // Ensure total amount is greater than 0
        },
    },
    payment_status: {
        type: DataTypes.ENUM('paid', 'unpaid'),
        defaultValue: 'unpaid',
    },
    shipping_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
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
    tableName: 'orders',
    timestamps: false,
    paranoid: true, // Enable soft deletes
    indexes: [
        {
            fields: ['user_id'], // Index for faster queries by user_id
        },
        {
            fields: ['status'], // Index for faster queries by status
        },
    ],
});

module.exports = Order;