
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const shipRoutes = require('./routes/ships');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error').errorHandler;
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB()
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ships', shipRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Maritime Operations Dashboard Backend API!");
});
// Error Handling
app.use(errorHandler);

//  Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

