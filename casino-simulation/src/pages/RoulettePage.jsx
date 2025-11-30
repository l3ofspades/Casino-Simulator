import React from 'react';
import { Link } from 'react-router-dom';
import Roulette from '../components/Roulette';
import ChipWallet from '../components/ChipWallet';

export default function RoulettePage() {
    return (
        <div className="game-container">
            <Link to="/" className="back-button">🏠 Back to Home</Link>
            <ChipWallet/>
            <Roulette />
        </div>
    );
}   