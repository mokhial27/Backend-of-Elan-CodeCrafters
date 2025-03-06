// utils/testDatabase.js
const sequelize = require('../config/db');

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection to the database has been established successfully.");
    } catch (err) {
        console.error("❌ Error connecting to the database:", err.message);
    }
};

module.exports = testDatabaseConnection;