import React from "react";
import Poker from "../components/Poker";
import ChipWallet from "../components/ChipWallet";

export default function PokerPage({ chips, setChips }) {
    return (
        <div className="game-container">
            <ChipWallet chips={chips} />
            <Poker chips={chips} setChips={setChips} />
        </div>
    );
}