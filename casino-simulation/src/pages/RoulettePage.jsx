import React from 'react';
import { Link } from 'react-router-dom';
import Roulette from '../components/Roulette';
import ChipWallet from '../components/ChipWallet';
import PageTitle from '../components/PageTitle';

export default function RoulettePage() {
    return (
        <>
            <PageTitle>Roulette | Casino Simulator</PageTitle>
        <div className="game-container">
            <Link to="/" className="back-button">🏠 Back to Home</Link>
            <ChipWallet/>
            <Roulette />
        </div>
        </>
    );
}   