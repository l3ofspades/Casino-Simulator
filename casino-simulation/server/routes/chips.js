import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user chips
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('chips');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ chips: user.chips });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
});

// Update user chips
router.patch('/:userId', async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });


        user.chips += amount;
        await user.save();

        res.json({ message: 'Chips updated', chips: user.chips });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;