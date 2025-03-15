const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Size = sequelize.define('Size', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'sizes',
    timestamps: false,
    paranoid: true, // Enable soft deletes
    indexes: [
        {
            fields: ['size'], // Index for faster queries by size
        },
    ],
});

module.exports = Size;

