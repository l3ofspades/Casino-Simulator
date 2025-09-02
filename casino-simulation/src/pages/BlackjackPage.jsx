import Blackjack from '../components/Blackjack.jsx';
import ChipWallet from '../components/ChipWallet.jsx';

export default function BlackjackPage({ chips, setChips }) {
  return (
    <div className="game-container">
      <ChipWallet chips={chips} />
      <Blackjack chips={chips} setChips={setChips} />
    </div>
  );
}
