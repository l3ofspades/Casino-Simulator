import React, { useState, useEffect } from "react";

export default function Blackjack({ chips, setChips }) {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealDealer, setRevealDealer] = useState(false);

  // Create new deck on mount
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((res) => res.json())
      .then((data) => setDeckId(data.deck_id));
  }, []);

  const startGame = () => {
    if (bet <= 0 || bet > chips) {
      alert("Please place a valid bet.");
      return;
    }

    setGameStarted(true);
    setRevealDealer(false);
    setGameOver(false);
    setMessage("");

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
      .then((res) => res.json())
      .then((data) => {
        setPlayerCards([data.cards[0], data.cards[2]]);
        setDealerCards([data.cards[1], data.cards[3]]);
      });
  };

  const hit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        setPlayerCards((prev) => [...prev, data.cards[0]]);
      });
  };

  const stand = () => {
    setRevealDealer(true);

  let dealerHand = [...dealerCards];

  const drawDealerCard =() => {
    const dealerValue = getHandValue(dealerHand);
    if (dealerValue < 17) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((res) => res.json())
        .then((data) => {
          dealerHand.push(data.cards[0]);
          drawDealerCard();
        });
    } else {
      endGame(dealerHand);
    }
  };

    drawDealerCard();
  };

  const getHandValue = (cards) => {
    let value = 0;
    let aces = 0;
    cards.forEach((card) => {
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        value += 10;
      } else if (card.value === "ACE") {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(card.value);
      }
    });
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }
    return value;
  };

  const endGame = (dealerFinalCards) => {
    const playerValue = getHandValue(playerCards);
    const dealerValue = getHandValue(dealerFinalCards);

    if (playerValue > 21) {
      setMessage("You busted! Dealer wins.");
      setChips((prev) => prev - bet);
    } else if (dealerValue > 21) {
      setMessage("Dealer busted! You win.");
      setChips((prev) => prev + bet);
    } else if (playerValue > dealerValue) {
      setMessage("You win!");
      setChips((prev) => prev + bet);
    } else if (dealerValue > playerValue) {
      setMessage("Dealer wins.");
      setChips((prev) => prev - bet);
    } else {
      setMessage("Push");
    }

    setGameOver(true);
  };

  return (
    <div>
      <h1>Blackjack</h1>
      <p>Chips: {chips}</p>
      {!gameStarted && (
        <div>
          <input
            type="number"
            placeholder="Enter bet"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
          />
          <button onClick={startGame}>Deal</button>
        </div>
      )}
      {gameStarted && (
        <div>
          <h2>Dealer's Cards</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {dealerCards.map((card, index) =>
              index === 1 && !revealDealer ? (
                <img
                  key={index}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Card_back_01.svg/200px-Card_back_01.svg.png"
                  alt="Hidden card"
                  style={{ width: "100px" }}
                />
              ) : (
                <img
                  key={index}
                  src={card.image}
                  alt={card.code}
                  style={{ width: "100px" }}
                />
              )
            )}
          </div>

          <h2>Player's Cards</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {playerCards.map((card, index) => (
              <img
                key={index}
                src={card.image}
                alt={card.code}
                style={{ width: "100px" }}
              />
            ))}
          </div>

          {!gameOver && (
            <div>
              <button onClick={hit}>Hit</button>
              <button onClick={stand}>Stand</button>
            </div>
          )}

          {gameOver && <h3 style={{ color: "lime" }}>{message}</h3>}

        </div>
      )}
    </div>
  );
}
