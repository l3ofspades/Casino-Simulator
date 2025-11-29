import React, { useState, useEffect } from "react";
import { useChips } from "../context/ChipContext";
import { useAuth } from "../context/AuthContext";
import { saveGameHistory } from "../services/historyService";
import backCard from "../assets/card-back.png";

export default function Blackjack() {
  const { chips, modifyChips } = useChips();
  const { currentUser } = useAuth();
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealDealer, setRevealDealer] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function createDeck() {
      const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
      const data = await res.json();
      setDeckId(data.deck_id);
    }
    createDeck();
  }, []);

  const drawCard = async () => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();
    return data.cards[0];
  };

  const getHandValue = (cards) => {
    let value = 0;
    let aces = 0;
    for (const card of cards) {
      if (["KING", "QUEEN", "JACK"].includes(card.value)) value += 10;
      else if (card.value === "ACE") {
        value += 11;
        aces++;
      } else value += parseInt(card.value);
    }
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    return value;
  };

  const startGame = async () => {
    if (bet <= 0 || bet > chips) {
      alert("Please place a valid bet.");
      return;
    }

    if (!deckId) {
      alert("Deck not ready yet. Please wait a second and try again.");
      return;
    }

    setGameStarted(true);
    setRevealDealer(false);
    setGameOver(false);
    setMessage("");

    const player = [await drawCard(), await drawCard()];
    const dealer = [await drawCard(), await drawCard()];
    setPlayerCards(player);
    setDealerCards(dealer);
  };

  const hit = async () => {
    const newCard = await drawCard();
    const newHand = [...playerCards, newCard];
    setPlayerCards(newHand);

    const total = getHandValue(newHand);
    if (total > 21) {
      handleEndGame(newHand, dealerCards);
    }
  };

  const stand = async () => {
    setRevealDealer(true);

    let dealerHand = [...dealerCards];
    while (getHandValue(dealerHand) < 17) {
      const newCard = await drawCard();
      dealerHand.push(newCard);
    }

    setDealerCards(dealerHand);
    handleEndGame(playerCards, dealerHand);
  };

  const handleEndGame = async (playerFinal, dealerFinal) => {
    const playerValue = getHandValue(playerFinal);
    const dealerValue = getHandValue(dealerFinal);

    let resultText = "";
    let resultType = "";
    let netChange = 0;

    if (playerValue > 21) {
      resultText = "Bust! Dealer wins.";
      resultType = "Loss";
      netChange = -bet;
      modifyChips(-bet);
    } else if (dealerValue > 21) {
      resultText = "Dealer busts! You win!";
      resultType = "Win";
      netChange = bet;
      modifyChips(bet);
    } else if (playerValue > dealerValue) {
      resultText = "You win!";
      resultType = "Win";
      netChange = bet;
      modifyChips(bet);
    } else if (dealerValue > playerValue) {
      resultText = "Dealer wins.";
      resultType = "Loss";
      netChange = -bet;
      modifyChips(-bet);
    } else {
      resultText = "Push!";
      resultType = "Push";
      netChange = 0;
    }

  setMessage(`${resultText} (Player: ${playerValue}, Dealer: ${dealerValue})`);
  setGameOver(true);

  try {
    console.log("🧠 Attempting to save game history:", {
      player: currentUser?.email || "Guest",
      game: "Blackjack",
      bet,
      result: resultType,
      netChange,
    });
    const res = await saveGameHistory({
      player: currentUser?.email || "Guest",
      game: "Blackjack",
      bet,
      result: resultType,
      netChange,
    });
    console.log("Blackjack history saved:", res);
  } catch (err) {
    console.error("Failed to save Blackjack history:", err);
  }
};

  const resetGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setBet(0);
    setGameStarted(false);
    setMessage("");
    setRevealDealer(false);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Blackjack</h1>
      <p>💰 Chips: {chips}</p>

      {!gameStarted ? (
        <div>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            placeholder="Enter bet"
          />
          <button onClick={startGame}>Deal</button>
        </div>
      ) : (
        <>
          <h2>Dealer's Hand {revealDealer && `(${getHandValue(dealerCards)})`}</h2>
          {dealerCards.map((card, i) =>
            i === 1 && !revealDealer ? (
              <img key={i} src={backCard} alt="Hidden card" width="100" />
            ) : (
              <img key={i} src={card.image} alt={card.code} width="100" />
            )
          )}

          <h2>Player's Hand ({getHandValue(playerCards)})</h2>
          {playerCards.map((card, i) => (
            <img key={i} src={card.image} alt={card.code} width="100" />
          ))}

          {!gameOver && (
            <>
              <button onClick={hit}>Hit</button>
              <button onClick={stand}>Stand</button>
            </>
          )}

          {gameOver && (
            <>
              <h3 style={{ marginTop: "20px" }}>{message}</h3>
              <button onClick={resetGame}>Play Again</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
