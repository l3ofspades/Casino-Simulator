import { useState, useEffect } from "react";
import { Hand } from "pokersolver";
import PlayAgain from "./common/Playagian";
import { useChips } from "../context/ChipContext";
import { logGameResult } from "../services/api";

function Poker({ onExit }) {
  const { chips, modifyChips } = useChips();
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [message, setMessage] = useState("");
  const [currentBet, setCurrentBet] = useState(0);
  const [roundStage, setRoundStage] = useState("pre-flop"); // pre-flop, flop, turn, river, showdown
  const [roundOver, setRoundOver] = useState(false);

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

  const placeBet = (amount) => {
    if (amount > chips) {
      alert("Not enough chips!");
      return;
    }
    setCurrentBet(amount);
    modifyChips(-amount);
  };

  const startHand = async () => {
    if (!deckId) return;

    const drawRes = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    );
    const data = await drawRes.json();

    setPlayerCards([data.cards[0], data.cards[2]]);
    setDealerCards([data.cards[1], data.cards[3]]);
    setCommunityCards([]);
    setMessage("");
    setRoundStage("pre-flop");
    setRoundOver(false);
    setCurrentBet(0);
  };

  const dealNext = async () => {
    if (!deckId) return;

    if (roundStage === "pre-flop") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
      );
      const data = await res.json();
      setCommunityCards(data.cards);
      setRoundStage("flop");
    } else if (roundStage === "flop") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await res.json();
      setCommunityCards([...communityCards, data.cards[0]]);
      setRoundStage("turn");
    } else if (roundStage === "turn") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await res.json();
      setCommunityCards([...communityCards, data.cards[0]]);
      setRoundStage("river");
    } else if (roundStage === "river") {
      setRoundOver(true);
      setRoundStage("showdown");

      try {
        const playerHand = Hand.solve(
          [...playerCards, ...communityCards].map((c) => c.code)
        );
        const dealerHand = Hand.solve(
          [...dealerCards, ...communityCards].map((c) => c.code)
        );
        const winner = Hand.winners([playerHand, dealerHand]);

        if (winner.includes(playerHand)) {
          setMessage("You win!");
          modifyChips(currentBet * 2);
          logGameResult("Win", currentBet, currentBet);
        } else if (winner.includes(dealerHand)) {
          setMessage("Opponent Wins!");
          modifyChips(-currentBet);
          logGameResult("Loss", currentBet, -currentBet);
        } else {
          setMessage("Push! It's a tie.");
          modifyChips(currentBet);
          logGameResult("Push", currentBet, 0);
        }
      } catch (err) {
        setMessage("Error evaluating hands.");
      }
    }
  };


  return (
    <div className="game-container">
      <h2>Texas Hold'em</h2>
      <div style={{ marginBottom: "10px" }}>💰 Chips: {chips}</div>

      {roundStage !== "showdown" && playerCards.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Enter bet"
            value={currentBet}
            onChange={(e) => setCurrentBet(Number(e.target.value))}
          />
          <button
            onClick={() => placeBet(currentBet)}
            style={{ marginLeft: "10px" }}
          >
            Place Bet
          </button>
          <button
            onClick={dealNext}
            style={{ marginLeft: "10px" }}
            disabled={currentBet === 0}
          >
            {roundStage === "pre-flop"
              ? "Deal Flop"
              : roundStage === "flop"
              ? "Deal Turn"
              : roundStage === "turn"
              ? "Deal River"
              : "Showdown"}
          </button>
        </div>
      )}

      {playerCards.length === 0 && <button onClick={startHand}>Start Hand</button>}

      <div className="cards-section">
        <h3>Opponent's Cards</h3>
        <div className="cards-container">
          {dealerCards.map((card, i) => (
            <img
              key={i}
              src={
                roundOver
                  ? card.image
                  : "https://deckofcardsapi.com/static/img/back.png"
              }
              alt="card"
              style={{
                width: "80px",
                height: "120px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>
      </div>

      <div className="cards-section">
        <h3>Your Cards</h3>
        <div className="cards-container">
          {playerCards.map((card, i) => (
            <img
              key={i}
              src={card.image}
              alt="card"
              style={{
                width: "80px",
                height: "120px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>
      </div>

      <div className="cards-section">
        <h3>Community Cards</h3>
        <div className="cards-container">
          {communityCards.map((card, i) => (
            <img
              key={i}
              src={card.image}
              alt="card"
              style={{
                width: "80px",
                height: "120px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>
      </div>

      {message && <h3 style={{ marginTop: "20px" }}>{message}</h3>}
      {roundOver && <PlayAgain onPlayAgain={startHand} onExit={onExit} />}
    </div>
  );
}

export default Poker;
