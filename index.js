const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./Routes/authRoutes');
require('dotenv').config({ path: './config/config.env' });
const testDatabaseConnection = require('./Util/testDatabase'); 
const seedDatabase = require('./seeders/seedDatabase'); 
const productRoutes = require('./Routes/productRoutes'); 


const app = express();

// Test database connection
testDatabaseConnection();

// Use Auth0 middleware
app.use(authMiddleware);

// Use auth routes
app.use('/', authRoutes);
app.use(express.static('public'));

// Use product routes
app.use(productRoutes);


// Auth status endpoint
app.get('/auth-status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user || null,
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Seed the database when the server starts
(async () => {
  try {
    await seedDatabase(); 
    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
})();
