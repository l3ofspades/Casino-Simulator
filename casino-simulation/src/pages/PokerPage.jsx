import React from "react";
import { Link } from "react-router-dom";
import Poker from "../components/Poker";
import ChipWallet from "../components/ChipWallet";

export default function PokerPage() {
    return (
        <div className="game-container">
            <Link to="/" className="back-button">🏠 Back to Home</Link>
            <ChipWallet />
            <Poker />
        </div>
    );
}