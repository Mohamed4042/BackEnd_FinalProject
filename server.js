require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const cors = require("cors")

const app = express();
app.use(cors());
const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
