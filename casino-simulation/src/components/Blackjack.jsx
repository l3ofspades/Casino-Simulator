
import { useState, useEffect } from 'react';

const suits = ['♠', '♥', '♦', '♣'];
const values = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10',
  'J', 'Q', 'K', 'A'
];

// Helper: create a deck of cards
function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Helper: get card numeric value for blackjack
function getCardValue(card) {
  if (card.value === 'A') return 11;
  if (['K', 'Q', 'J'].includes(card.value)) return 10;
  return parseInt(card.value);
}

// Helper: calculate hand score (handling Aces as 1 or 11)
function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  for (let card of hand) {
    score += getCardValue(card);
    if (card.value === 'A') aceCount++;
  }
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }
  return score;
}

export default function Blackjack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Start a new game
  function startGame() {
    const newDeck = createDeck().sort(() => Math.random() - 0.5);
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setPlayerScore(calculateScore(playerCards));
    setDealerScore(calculateScore(dealerCards));
    setMessage('');
    setIsPlayerTurn(true);
    setGameOver(false);
  }

  // Player hits: add a card
  function hit() {
    if (!isPlayerTurn || gameOver) return;
    const newDeck = [...deck];
    const card = newDeck.pop();
    const newPlayerHand = [...playerHand, card];
    setPlayerHand(newPlayerHand);
    setDeck(newDeck);
    const score = calculateScore(newPlayerHand);
    setPlayerScore(score);
    if (score > 21) {
      setMessage('Bust! You lose.');
      setIsPlayerTurn(false);
      setGameOver(true);
    }
  }

  // Player stands: dealer's turn
  function stand() {
    if (!isPlayerTurn || gameOver) return;
    setIsPlayerTurn(false);
  }

  // Dealer plays after player stands
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      let newDeck = [...deck];
      let newDealerHand = [...dealerHand];
      let score = calculateScore(newDealerHand);

      while (score < 17) {
        const card = newDeck.pop();
        newDealerHand.push(card);
        score = calculateScore(newDealerHand);
      }
      setDealerHand(newDealerHand);
      setDealerScore(score);

      // Determine winner
      if (score > 21) {
        setMessage('Dealer busts! You win!');
      } else if (score < playerScore) {
        setMessage('You win!');
      } else if (score === playerScore) {
        setMessage('Push (tie).');
      } else {
        setMessage('Dealer wins.');
      }
      setGameOver(true);
    }
  }, [isPlayerTurn, gameOver, dealerHand, deck, playerScore]);
useEffect(() => {
    startGame(); // Start the game when component mounts
  }, []);
  return (
    <div>
      <h2>Blackjack</h2>
      <div>
        <strong>Your Hand ({playerScore}): </strong>
        {playerHand.map((card, i) => (
          <span key={i}>{card.value}{card.suit} </span>
        ))}
      </div>
      <div>
        <strong>Dealer's Hand ({isPlayerTurn ? '?' : dealerScore}): </strong>
        {dealerHand.map((card, i) => (
          <span key={i}>
            {isPlayerTurn && i === 0 ? '?? ' : `${card.value}${card.suit} `}
          </span>
        ))}
      </div>
      <p>{message}</p>
      <div>
        {!gameOver && (
          <>
            <button onClick={hit} disabled={!isPlayerTurn}>Hit</button>
            <button onClick={stand} disabled={!isPlayerTurn}>Stand</button>
          </>
        )}
        {gameOver && <button onClick={startGame}>Restart</button>}
      </div>
    </div>
  );
}

