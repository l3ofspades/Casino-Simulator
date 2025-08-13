import { useState, useEffect } from "react";

function Poker() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [message, setMessage] = useState("");

  // Create a new deck on mount
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

    // Draw hole cards for player and dealer (4 cards)
    const drawRes = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    );
    const data = await drawRes.json();

    setPlayerCards([data.cards[0], data.cards[2]]);
    setDealerCards([data.cards[1], data.cards[3]]);
    setCommunityCards([]);
    setMessage("");
  };

  // Deal the flop (3 community cards)
  const dealFlop = async () => {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
    );
    const data = await res.json();
    setCommunityCards(data.cards);
  };

  // Deal turn (1 card)
  const dealTurn = async () => {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await res.json();
    setCommunityCards([...communityCards, data.cards[0]]);
  };

  // Deal river (1 card)
  const dealRiver = async () => {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await res.json();
    setCommunityCards([...communityCards, data.cards[0]]);
    setMessage("Hand complete! Compare cards to determine winner.");
  };

  return (
    <div>
      <h2>Texas Hold'em</h2>

      <button onClick={startGame}>Start Game</button>
      {playerCards.length > 0 && communityCards.length === 0 && (
        <button onClick={dealFlop} style={{ marginLeft: "10px" }}>
          Deal Flop
        </button>
      )}
      {communityCards.length === 3 && (
        <button onClick={dealTurn} style={{ marginLeft: "10px" }}>
          Deal Turn
        </button>
      )}
      {communityCards.length === 4 && (
        <button onClick={dealRiver} style={{ marginLeft: "10px" }}>
          Deal River
        </button>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Dealer's Hole Cards</h3>
        <div style={{ display: "flex" }}>
          {dealerCards.map((card, index) => (
            <img
              key={index}
              src={card.image}
              alt={card.code}
              style={{ width: "80px", marginRight: "5px" }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Your Hole Cards</h3>
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
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Community Cards</h3>
        <div style={{ display: "flex" }}>
          {communityCards.map((card, index) => (
            <img
              key={index}
              src={card.image}
              alt={card.code}
              style={{ width: "80px", marginRight: "5px" }}
            />
          ))}
        </div>
      </div>

      {message && <h3 style={{ marginTop: "20px" }}>{message}</h3>}
    </div>
  );
}

export default Poker;
