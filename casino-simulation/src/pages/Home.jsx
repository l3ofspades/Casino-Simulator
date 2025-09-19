import React from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🎰 Casino Simulator 🎲</h1>
      <p>Welcome! Choose your game below:</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/blackjack")}>♠ Blackjack</button>
        <button onClick={() => navigate("/poker")}>♥ Poker</button>
        <button onClick={() => navigate("/roulette")}>♦ Roulette</button>
      </div>
    </div>
  );
}

    