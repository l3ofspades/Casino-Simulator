import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import GameHistory from './models/GameHistory.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Casino Simulation Server is running');
});

// Example endpoint to manage chips
let chips = 1000;

app.get('/api/chips', (req, res) => {
    res.json({ chips });
});

app.post('/api/chips', (req, res) => {
    const { amount } = req.body;
    chips += amount;
    res.json({ message: 'Chips updated', chips });
});

app.post('/api/game-history', async (req, res) => {
    try {
        const { player, game, bet, result, netChange } = req.body;
        const entry = new GameHistory({ player, game, bet, result, netChange });
        await entry.save();
        res.status(201).json({ message: 'Game history recorded', entry });
    } catch (error) {
        res.status(500).json({ message: 'Error recording game history', error });
    }
});

app.get('/api/game-history', async (req, res) => {
    try {
        const history = await GameHistory.find().sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game history', error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));