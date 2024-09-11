const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Assuming you have a separate file for MongoDB connection

dotenv.config();

const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const skillRoutes = require('./routes/skillRoutes'); // New skill routes
const employeeSkill = require('./routes/employeeSkillRoutes'); // New skill routes

const cors = require('cors');


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors());
// Routes
app.use('/employees', employeeRoutes);     // Routes for Employee management
app.use('/departments', departmentRoutes); // Routes for Department management
app.use('/categories', categoryRoutes);    // Routes for Category management
app.use('/skills', skillRoutes);           // Routes for Skill management
app.use('/employeeSkill', employeeSkill);  // Routes for Skill management

// Basic route for API status check
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});