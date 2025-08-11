export default function GameSelector({ onGameSelect }) {
  return (
    <div className="game-selector">
      <h2>Select a Game</h2>
      <button onClick={() => onGameSelect('blackjack')}>Blackjack</button>
      <button onClick={() => onGameSelect('roulette')}>Roulette</button>
      <button onClick={() => onGameSelect('poker')}>Poker</button>
    </div>
  );
}
