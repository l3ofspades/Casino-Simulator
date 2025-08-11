import { useState, useEffect } from 'react';

const suits = ['♠', '♥', '♦', '♣'];
const values = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'J', 'Q', 'K', 'A'
];

function createDeck() {
  const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }   
    }
    return deck;
}

export default function Poker() {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [communityCards, setCommunityCards] = useState([]);
    const [stage, setState] = useState('start'); // 'start', 'flop', 'turn', 'river'

    useEffect(() => {
        const newDeck = createDeck().sort(() => Math.random() - 0.5);
        setDeck(newDeck);
    }, []);

    function startGame() {
        const newDeck = [...deck];
        const player = [newDeck.pop(), newDeck.pop()];
        setPlayerHand(player);
        setCommunityCards([]);
        setStage('starte');
        setDeck(newDeck);
    }

    function dealFlop() {
        if (stage !== 'start') return;
        const newDeck = [...deck];
        const flopCards = [newDeck.pop(), newDeck.pop(), newDeck.pop()];
        setCommunityCards(flopCards);
        setDeck(newDeck);
        setState('flop');
    }

    function dealTurn() {
        if (stage !== 'flop') return;
        const newDeck = [...deck];
        const turnCard = newDeck.pop();
        setCommunityCards(prev => [...prev, turnCard]);
        setDeck(newDeck);
        setState('turn');
    }

    function dealRiver() {
        if (stage !== 'turn') return;
        const newDeck = [...deck];
        const riverCard = newDeck.pop();
        setCommunityCards(prev => [...prev, riverCard]);
        setDeck(newDeck);
        setState('river');
    }

    function showDown() {
        if (stage !== 'river') return;
        setStage('showdown');
        // TODO Add hand evaluation later
    }
    return (
        <div>
            <div>
                <h2>Texas Hold'em Poker</h2>
                <div>
                    <strong>Your Hole Cards:</strong>
                    {playerHand.map((card, index) => (
                        <span key={index} style={{ margin: '0 5px' }}>
                            {card.value}{card.suit}
                        </span>
                    ))}
                </div>
                <strong>Community Cards:</strong>
                {communityCards.map((card, index) => (
                    <span key={index} style={{ margin: '0 5px' }}>
                        {card.value}{card.suit}
                    </span>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                {stage === 'start' && <button onClick={dealFlop}>Deal Flop</button>}
                {stage === 'flop' && <button onClick={dealTurn}>Deal Turn</button>}
                {stage === 'turn' && <button onClick={dealRiver}>Deal River</button>}
                {stage === 'river' && <button onClick={showDown}>Showdown</button>}
                {(stage === 'showdown' || stage === 'start') && (
                    <button onClick={startGame}>Restart</button>
                )}
            </div>

            {stage === 'showdown' && (
                <div>
                    <p>Showdown - Evaluate hands here (TODO)</p>
                </div>
            )}
        </div>
    );
}