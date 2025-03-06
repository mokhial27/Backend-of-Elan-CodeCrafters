// index.js
const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./Routes/authRoutes');
require('dotenv').config({ path: './config/config.env' });

const app = express();

// Use Auth0 middleware
app.use(authMiddleware);

// Use auth routes
app.use('/', authRoutes);
app.use(express.static('public'));

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});