import React from 'react';
import Blackjack from './components/Blackjack';
import ChipWallet from '../components/ChipWallet';

export default function BlackjackPage({ chips, setChips }) {
    return (
        <div className="game-container">
            <ChipWallet chips={chips} />
            <Blackjack chips={chips} setChips={setChips} />
        </div>
    );
}