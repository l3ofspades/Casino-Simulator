import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GameHistory from './models/GameHistory.js';
import authRoutes from "./routes/auth.js";

//  Use authentication routes

app.use('/api/auth', authRoutes);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//  Connect to MongoDB (with validation)
if (!process.env.MONGO_URI) {
  console.error('❌ Missing MONGO_URI in .env file');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

//  Basic route
app.get('/', (req, res) => {
  res.send('Casino Simulation Server is running');
});

//  Temporary in-memory chip balance
let chips = 1000;

// GET chip balance
app.get('/api/chips', (req, res) => {
  res.json({ chips });
});

// POST update chip balance
app.post('/api/chips', (req, res) => {
  const { amount } = req.body;

  const parsedAmount = parseInt(amount, 10);
  if (isNaN(parsedAmount)) {
    return res.status(400).json({ message: 'Invalid chip amount' });
  }

  chips += parsedAmount;
  if (chips < 0) chips = 0; // prevent negatives

  console.log(`💰 Chip balance updated: ${chips}`);
  res.json({ message: 'Chips updated', chips });
});

//  Save a new game result
app.post('/api/history', async (req, res) => {
  try {
    const { player, game, bet, result, netChange } = req.body;

    if (!player || !game || bet == null || result == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const entry = new GameHistory({ player, game, bet, result, netChange });
    await entry.save();
    res.status(201).json({ message: 'Game history recorded', entry });
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Error recording game history', error });
  }
});

//  Get game history for a player
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

//  Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
