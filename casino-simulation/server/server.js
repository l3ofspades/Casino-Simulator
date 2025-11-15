import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import GameHistory from './models/GameHistory.js';

dotenv.config();

// Initialize app BEFORE using it
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use routes AFTER initializing app
app.use('/api/auth', authRoutes);

// Connect to MongoDB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Basic route
app.get('/', (req, res) => {
  res.send('Casino Simulation Server is running');
});

// Chip routes
let chips = 1000;

app.get('/api/chips', (req, res) => {
  res.json({ chips });
});

app.post('/api/chips', (req, res) => {
  const { amount } = req.body;
  const parsedAmount = parseInt(amount, 10);
  if (isNaN(parsedAmount)) return res.status(400).json({ message: 'Invalid chip amount' });
  chips = Math.max(0, chips + parsedAmount);
  res.json({ message: 'Chips updated', chips });
});

// History routes
app.post('/api/history', async (req, res) => {
  try {
    console.log(" /api/history request received:", req.body);

    const { player, game, bet, result, netChange } = req.body;
    const entry = new GameHistory({ player, game, bet, result, netChange });
    await entry.save();
    res.status(201).json({ message: 'Game history recorded', entry });
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Error recording game history', error });
  }
});

app.get('/api/history/:player', async (req, res) => {
  try {
    const { player } = req.params;
    const history = await GameHistory.find({ player }).sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching game history', error });
  }
});


// Only listen when not testing

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
