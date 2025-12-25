import React from "react";
import { Link } from "react-router-dom";
import Poker from "../components/Poker";
import ChipWallet from "../components/ChipWallet";
import PageTitle from "../components/PageTitle";

export default function PokerPage() {
    return (
        <>
            <PageTitle>Poker | Casino Simulator</PageTitle>
        <div className="game-container">
            <Link to="/" className="back-button">🏠 Back to Home</Link>
            <ChipWallet />
            <Poker />
        </div>
        </>
    );
}