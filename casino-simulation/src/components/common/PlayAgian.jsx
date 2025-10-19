export default function PlayAgain({ onPlayAgain, onExit }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={onPlayAgain} style={{ marginRight: '10px' }}>Play Again</button>
            <button onClick={onExit} style={{ marginLeft: '10px' }}>Exit to Game Select</button>
        </div>
    );
}