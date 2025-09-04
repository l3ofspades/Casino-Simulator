import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BlackjackPage from './pages/BlackjackPage.jsx';
import PokerPage from './pages/PokerPage.jsx';
import RoulettePage from './pages/RoulettePage.jsx';
import './styles/Design.css';

function App() {
  const [chips, setChips] = useState(1000);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackjack" element={<BlackjackPage chips={chips} setChips={setChips} />} />
        <Route path="/poker" element={<PokerPage chips={chips} setChips={setChips} />} />
        <Route path="/roulette" element={<RoulettePage chips={chips} setChips={setChips} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
