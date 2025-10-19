import { useState } from 'react';
import ChipWallet from './ChipWallet';
import Blackjack from './Blackjack';
import Poker from './Poker';
import Roulette from './Roulette';
import GameSelect from './GameSelect';






function Game() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [chips, setChips] = useState(1000); // Initial chip count

  const handleExitGame = () => setSelectedGame(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎰 Casino Simulator</h1>
      <ChipWallet chips={chips} />

      {!selectedGame && (
        <GameSelect onSelectGame={setSelectedGame(Game)} />
      )}

      {selectedGame === 'Blackjack' && (
        <Blackjack chips={chips} setChips={setChips} onExit={handleExitGame} />
      )}

      {selectedGame === 'roulette' && (
        <Roulette chips={chips} setChips={setChips} onExit={handleExitGame} />
      )}

      {selectedGame === 'Poker' && (
        <Poker chips={chips} setChips={setChips} onExit={handleExitGame} />
      )}
    </div>
  );
}

export default Game;

