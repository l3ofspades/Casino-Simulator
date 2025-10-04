import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home.jsx';
import BlackjackPage from './pages/BlackjackPage.jsx';
import PokerPage from './pages/PokerPage.jsx';
import RoulettePage from './pages/RoulettePage.jsx';

export default function App() {
  const [chips, setChips] = useState(1000);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/blackjack" className="nav-link">Blackjack</Link>
        <Link to="/poker" className="nav-link">Poker</Link>
        <Link to="/roulette" className="nav-link">Roulette</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blackjack" element={<BlackjackPage chips={chips} setChips={setChips} />} />
          <Route path="/poker" element={<PokerPage chips={chips} setChips={setChips} />} />
          <Route path="/roulette" element={<RoulettePage chips={chips} setChips={setChips} />} />
        </Routes>
    </Router>
  );
}