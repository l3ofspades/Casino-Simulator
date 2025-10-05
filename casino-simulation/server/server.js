import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));