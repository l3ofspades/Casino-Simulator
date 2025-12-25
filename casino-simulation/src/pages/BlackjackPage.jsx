import React from 'react';
import { Link } from 'react-router-dom';
import Blackjack from '../components/Blackjack.jsx';
import ChipWallet from '../components/ChipWallet.jsx';
import PageTitle from '../components/PageTitle.jsx';


export default function BlackjackPage() {
  return (
    <>
      <PageTitle>Blackjack | Casino Simulator</PageTitle>
   
    <div className="game-container">
     <Link to="/" className="back-button">🏠 Back to Home</Link>
      <ChipWallet />
      <Blackjack/>
    </div>
    </>
  );
}
