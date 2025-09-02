import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h2 className="home-title">Welcome to the Casino!</h2>
            <p className="home-subtitle"> Select a game from below to start playing!!🎲</p>


            <div className="game-links">
                <Link className="game-button" to="/blackjack">Blackjack</Link>
                <Link className="game-button" to="/poker">Poker</Link>
                <Link className="game-button" to="/roulette">Roulette</Link>
            </div>
            </div>
    );
}

    