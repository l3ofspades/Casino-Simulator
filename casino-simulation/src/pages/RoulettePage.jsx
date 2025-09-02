import React from 'react';
import Roulette from './components/Roulette';
import ChipWallet from '../components/ChipWallet';

export default function RoulettePage({ chips, setChips }) {
    return (
        <div className="game-container">
            <ChipWallet chips={chips} />
            <Roulette chips={chips} setChips={setChips} />
        </div>
    );
}   