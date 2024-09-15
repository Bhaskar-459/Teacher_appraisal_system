const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const kpaRoutes = require('./routes/kpaRoutes');
const collaborateRoutes = require('./routes/collaborateRoutes');
const aiReviewRoutes = require('./routes/aiReviewRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./config/db');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
dbConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/kpa', kpaRoutes);
app.use('/api/collaborate', collaborateRoutes);
app.use('/api/ai-review', aiReviewRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
