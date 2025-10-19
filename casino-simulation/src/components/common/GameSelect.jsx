export default function GameSelect({ onSelectGame }) {
  return (
    <div>
      <h2>Select a Game</h2>
      <button onClick={() => onSelectGame('Blackjack')}>Blackjack</button>
      <button onClick={() => onSelectGame('Poker')}>Poker</button>
      <button onClick={() => onSelectGame('Roulette')}>Roulette</button>
    </div>
  );
}
