import { useState, useEffect } from "react";
import { Hand } from "pokersolver";
import PlayAgain from "./common/PlayAgain";
import { useChips } from "../context/ChipContext";
import { useAuth } from "../context/AuthContext";
import { saveGameHistory } from "../services/historyService";

function getOrCreateGuestId() {
  const KEY = "guestId";
  let id = localStorage.getItem(KEY);
  if (!id) {
    // Simple unique-ish id: guest-<timestamp>-<random>
    id = `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

function toPokerSolverCode(code) {
  const rank = code[0] === "0" ? "T" : code[0];
  const suit = code[1].toLowerCase();
  return `${rank}${suit}`;
}

function Poker({ onExit }) {
  const { currentUser } = useAuth();
  const { chips, modifyChips } = useChips();

  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [message, setMessage] = useState("");

  const [currentBet, setCurrentBet] = useState(0);
  const [roundStage, setRoundStage] = useState("pre-flop");
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
    if (!amount || amount <= 0) {
      alert("Enter a valid bet!");
      return;
    }
    if (amount > chips) {
      alert("Not enough chips!");
      return;
    }

    setCurrentBet(amount);
    modifyChips(-amount); // bet placed
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

  const getPlayerKey = () => {
    // Use registered username if logged in, otherwise unique guest id
    return currentUser?.username || getOrCreateGuestId();
  };

  const dealNext = async () => {
    if (!deckId) return;

    if (currentBet <= 0) {
      alert("Place a bet first.");
      return;
    }

    if (roundStage === "pre-flop") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
      );
      const data = await res.json();
      setCommunityCards(data.cards);
      setRoundStage("flop");
      return;
    }

    if (roundStage === "flop") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await res.json();
      setCommunityCards((prev) => [...prev, data.cards[0]]);
      setRoundStage("turn");
      return;
    }

    if (roundStage === "turn") {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await res.json();
      setCommunityCards((prev) => [...prev, data.cards[0]]);
      setRoundStage("river");
      return;
    }

    // Showdown
    if (roundStage === "river") {
      setRoundOver(true);
      setRoundStage("showdown");

      try {
       const playerCodes = [...playerCards, ...communityCards].map((c) =>
          toPokerSolverCode(c.code)
        );
        const dealerCodes = [...dealerCards, ...communityCards].map((c) =>
          toPokerSolverCode(c.code)
        );

        console.log("Player raw:", [...playerCards, ...communityCards].map(c => c.code));
        console.log("Player solver:", playerCodes);
        console.log("Dealer raw:", [...dealerCards, ...communityCards].map(c => c.code));
        console.log("Dealer solver:", dealerCodes);

        const playerHand = Hand.solve(playerCodes);
        const dealerHand = Hand.solve(dealerCodes);

        const winners = Hand.winners([playerHand, dealerHand]);

        const playerKey = getPlayerKey();

        if (winners.includes(playerHand)) {
          setMessage("You win!");
          modifyChips(currentBet * 2); // return bet + profit

          await saveGameHistory({
            player: playerKey,
            game: "Poker",
            bet: currentBet,
            result: "Win",
            netChange: currentBet,
          });
        } else if (winners.includes(dealerHand)) {
          setMessage("Opponent Wins!");
          // no extra chip subtraction here (bet already deducted)

          await saveGameHistory({
            player: playerKey,
            game: "Poker",
            bet: currentBet,
            result: "Loss",
            netChange: -currentBet,
          });
        } else {
          setMessage("Push! It's a tie.");
          modifyChips(currentBet); // refund bet

          await saveGameHistory({
            player: playerKey,
            game: "Poker",
            bet: currentBet,
            result: "Push",
            netChange: 0,
          });
        }
      } catch (err) {
        console.error(err);
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

      {playerCards.length === 0 && (
        <button onClick={startHand}>Start Hand</button>
      )}

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
              style={{ width: "80px", height: "120px", marginRight: "5px" }}
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
              style={{ width: "80px", height: "120px", marginRight: "5px" }}
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
              style={{ width: "80px", height: "120px", marginRight: "5px" }}
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
