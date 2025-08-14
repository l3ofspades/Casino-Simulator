import { useState } from 'react';
import GameSelector from './GameSelector';
import ChipWallet from './ChipWallet';
import Blackjack from './Blackjack';
import Poker from './Poker';
import Roulette from './Roulette';

function Game() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [chips, setChips] = useState(1000); // Initial chip count

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Casino</h1>
      <ChipWallet chips={chips} />
      <GameSelector onGameSelect={setSelectedGame} />


      {selectedGame === 'blackjack' && <Blackjack />}
      {selectedGame === 'roulette' && <Roulette />}
     {selectedGame === 'poker' && <Poker />}


 </div>
    );
}

export default Game;

