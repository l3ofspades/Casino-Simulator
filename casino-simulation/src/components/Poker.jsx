import { useState, useEffect } from "react";
import "./Poker.css"; // Assuming you have a CSS file for styling

export default function Poker() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [chips, setChips] = useState(1000);
  const [bet, setBet] = useState(0);
  const [roundOver, setRoundOver] = useState(false);

  // Fetch a fresh deck
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) => setDeckId(data.deck_id));
  }, []);

  const startHand = async () => {
    if (!deckId || bet <= 0) return;
    setRoundOver(false);

    const draw = async (count) => {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
      );
      const data = await res.json();
      return data.cards;
    };

    const player = await draw(2);
    const dealer = await draw(2);
    const community = await draw(5);

    setPlayerCards(player);
    setDealerCards(dealer);
    setCommunityCards(community);
    setChips((prev) => prev - bet);
  };

  const revealDealer = () => {
    setRoundOver(true);
    setChips((prev) => prev + bet * 2); // placeholder win logic
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Poker</h2>
      <div style={{ marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold" }}>Chips:</span> {chips}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          min="0"
          max={chips}
          value={bet}
          onChange={(e) => setBet(parseInt(e.target.value) || 0)}
        />
        <button onClick={startHand} style={{ marginLeft: "10px" }}>
          Deal
        </button>
      </div>

      {/* Dealer */}
      <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
        <h3>Dealer's Cards</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {dealerCards.map((card, i) => (
            <img
              key={i}
              src={
                roundOver
                  ? card.image
                  : i === 0
                  ? card.image
                  : "https://deckofcardsapi.com/static/img/back.png"
              }
              alt="card"
              style={{ width: "80px", height: "120px" }}
            />
          ))}
        </div>
      </div>

      {/* Player */}
      <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
        <h3>Player's Cards</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {playerCards.map((card, i) => (
            <img
              key={i}
              src={card.image}
              alt="card"
              style={{ width: "80px", height: "120px" }}
            />
          ))}
        </div>
      </div>

      {/* Community Cards */}
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <h3>Community Cards</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {communityCards.map((card, i) => (
            <img
              key={i}
              src={card.image}
              alt="card"
              style={{ width: "80px", height: "120px" }}
            />
          ))}
        </div>
      </div>

      {!roundOver && dealerCards.length > 0 && (
        <button
          onClick={revealDealer}
          style={{ marginTop: "10px", padding: "10px" }}
        >
          Reveal Dealer Cards
        </button>
      )}
    </div>
  );
}