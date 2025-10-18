import mongoose from 'mongoose';

const gameHistorySchema = new mongoose.Schema({
    player: { type: String, required: true },
    game: { type: String, required: true },
    bet: { type: Number, required: true },
    result: { type: String, required: true },
    netChange: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

export default GameHistory;