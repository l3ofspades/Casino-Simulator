import { useState, useEffect } from "react";

function Blackjack() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // Create and shuffle a new deck when the component loads
  useEffect(() => {
    const getDeck = async () => {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await res.json();
      setDeckId(data.deck_id);
    };
    getDeck();
  }, []);

  // Start a new hand
  const startGame = async () => {
    if (!deckId) return;
    const drawRes = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    );
    const data = await drawRes.json();

    setPlayerCards([data.cards[0], data.cards[2]]);
    setDealerCards([data.cards[1], data.cards[3]]);
    setGameOver(false);
    setMessage("");
  };

  // Draw a card for the player
  const hit = async () => {
    if (!deckId || gameOver) return;
    const drawRes = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await drawRes.json();

    const newHand = [...playerCards, data.cards[0]];
    setPlayerCards(newHand);

    if (calculateHand(newHand) > 21) {
      setMessage("Bust! You lose.");
      setGameOver(true);
    }
  };

  // Dealer draws until reaching 17+
  const stand = async () => {
    let dealerHand = [...dealerCards];

    while (calculateHand(dealerHand) < 17) {
      const drawRes = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await drawRes.json();
      dealerHand.push(data.cards[0]);
    }

    setDealerCards(dealerHand);
    determineWinner(playerCards, dealerHand);
  };

  // Calculate blackjack hand value
  const calculateHand = (hand) => {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        value += 10;
      } else if (card.value === "ACE") {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(card.value);
      }
    });

    // Adjust for Aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  // Decide winner
  const determineWinner = (player, dealer) => {
    const playerTotal = calculateHand(player);
    const dealerTotal = calculateHand(dealer);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setMessage("You win!");
    } else if (playerTotal < dealerTotal) {
      setMessage("Dealer wins!");
    } else {
      setMessage("Push (tie)!");
    }

    setGameOver(true);
  };

  return (
    <div>
      <h2>Blackjack</h2>

      <button onClick={startGame}>Start Game</button>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ marginRight: "50px" }}>
          <h3>Dealer's Hand</h3>
          <div style={{ display: "flex" }}>
            {dealerCards.map((card, index) => (
              <img
                key={index}
                src={
                  !gameOver && index === 1 ? "https://via.placeholder.com/80x120?text=?" : card.image
                }
                alt={card.code}
                style={{ width: "80px", marginRight: "5px" }
                }
              />
            ))}
          </div>
          <p>Total: {calculateHand(dealerCards)}</p>
        </div>

        <div>
          <h3>Your Hand</h3>
          <div style={{ display: "flex" }}>
            {playerCards.map((card, index) => (
              <img
                key={index}
                src={card.image}
                alt={card.code}
                style={{ width: "80px", marginRight: "5px" }}
              />
            ))}
          </div>
          <p>Total: {calculateHand(playerCards)}</p>
        </div>
      </div>

      {!gameOver && playerCards.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={hit} style={{ marginRight: "10px" }}>
            Hit
          </button>
          <button onClick={stand}>Stand</button>
        </div>
      )}

      {message && <h3 style={{ marginTop: "20px" }}>{message}</h3>}
    </div>
  );
}

export default Blackjack;
