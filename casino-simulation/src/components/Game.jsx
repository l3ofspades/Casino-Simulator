import { useState } from 'react';
import GameSelector from './GameSelector';
import ChipWallet from './ChipWallet';
import Blackjack from './Blackjack';

function Game() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [chips, setChips] = useState(1000); // Initial chip count

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Casino</h1>
      <ChipWallet chips={chips} />
      <GameSelector onGameSelect={setSelectedGame} />


      {selectedGame === 'blackjack' && <Blackjack />}
      {selectedGame === 'roulette' && <div>Roulette Game will go here</div>}
      {selectedGame === 'poker' && <div>Poker Game will go here</div>}
      </div>
    );  
}

export default Game;

