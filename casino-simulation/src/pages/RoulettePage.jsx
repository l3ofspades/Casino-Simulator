import React from 'react';
import { Link } from 'react-router-dom';
import Roulette from '../components/Roulette';
import ChipWallet from '../components/ChipWallet';

export default function RoulettePage({ chips, setChips }) {
    return (
        <div className="game-container">
            <Link to="/" className="back-button">🏠 Back to Home</Link>
            <ChipWallet chips={chips} />
            <Roulette chips={chips} setChips={setChips} />
        </div>
    );
}   