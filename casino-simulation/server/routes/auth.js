import express from 'express';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// register
router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const passwordHash = await bycrypt.hash(password, 10);

      // Create user with default chips
      await User.create({
          username,
          email,
          passwordHash,
          chips: 1000, // default chip balance
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
      });

// login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bycrypt.compare(password, user.passwordHash);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT
      const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.json({ 
        message: 'Login successful',
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            chips: user.chips,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    } 
      });

export default router;