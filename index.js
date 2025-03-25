const express = require('express');
const path = require('path'); // Add path module
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./Routes/authRoutes');
require('dotenv').config({ path: './config/config.env' });
const testDatabaseConnection = require('./Util/testDatabase');
const seedDatabase = require('./seeders/seedDatabase');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require("./Routes/User");
const cors = require('cors');


const app = express();

// Test database connection
testDatabaseConnection();



// Middleware to parse JSON
app.use(express.json());
app.use(cors());


// Serve static files - this will serve your HTML and other static assets
app.use(express.static(path.join(__dirname, 'public')));

// Use Auth0 middleware
app.use(authMiddleware);

// Use auth routes
app.use('/', authRoutes);

// Use product routes
app.use(productRoutes);

// Use user routes
app.use(userRoutes);


// Auth status endpoint
app.get('/auth-status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.isAuthenticated() ? req.oidc.user : null
  });
});

// Root route - serve the HTML file instead of plain text
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Seed the database when the server starts
/*/(async () => {
  try {
    await seedDatabase();
    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
})();/*/

