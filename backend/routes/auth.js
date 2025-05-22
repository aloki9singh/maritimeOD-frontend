const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const ErrorResponse = require('../middleware/error').ErrorResponse;

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

// Signup Route
router.post('/signup', async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    // Validate input
    if (!email || !password || !name) {
      throw new ErrorResponse('Missing required fields', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorResponse('Email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { email, name } });
  } catch (err) {
    next(err);
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      throw new ErrorResponse('Missing email or password', 400);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { email, name: user.name } });
  } catch (err) {
    next(err);
  }
});

// Get User Info (Protected Route)
router.get('/user', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      throw new ErrorResponse('User not found', 404);
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;