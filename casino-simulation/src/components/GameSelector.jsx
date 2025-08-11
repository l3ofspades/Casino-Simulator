export default function GameSelector({ onGameSelect }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <button onClick={() => onSelectGame('blackjack')} style={{ marginRight: '10px' }}>
                Blackjack
            </button>
            <button onClick={() => onSelectGame('roulette')} style={{ marginRight: '10px' }}>
                Roulette
            </button>
            <button onClick={() => onSelectGame('poker')}>
                Poker
            </button>
        </div>  
    );
}