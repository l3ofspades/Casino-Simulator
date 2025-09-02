// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blackjack from "./components/Blackjack";
import Poker from "./components/Poker";
import Roulette from "./components/Roulette";
import ChipWallet from "./components/ChipWallet";
import './styles/Design.css';

function App() {
  const [chips, setChips] = React.useState(1000);

  return (
    <Router>
      <div className="game-container">
        <ChipWallet chips={chips} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blackjack" element={<Blackjack chips={chips} setChips={setChips} />} />
          <Route path="/poker" element={<Poker chips={chips} setChips={setChips} />} />
          <Route path="/roulette" element={<Roulette chips={chips} setChips={setChips} />} />
          <Route path="*" element={<Home />} /> {/* Redirect any undefined route to Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


