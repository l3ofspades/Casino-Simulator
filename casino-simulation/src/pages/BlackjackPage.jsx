import React from 'react';
import { Link } from 'react-router-dom';
import Blackjack from '../components/Blackjack.jsx';
import ChipWallet from '../components/ChipWallet.jsx';

export default function BlackjackPage({ chips, setChips }) {
  return (
    <div className="game-container">
     <Link to="/" className="back-button">🏠 Back to Home</Link>
      <ChipWallet chips={chips} />
      <Blackjack chips={chips} setChips={setChips} />
    </div>
  );
}
