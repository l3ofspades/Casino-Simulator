import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BlackjackPage from './pages/BlackjackPage.jsx';
import PokerPage from './pages/PokerPage.jsx';
import RoulettePage from './pages/RoulettePage.jsx';
import { ChipProvider } from './context/ChipContext.jsx';  // ✅ import your context provider
import "./assets/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackjack" element={<BlackjackPage />} />
        <Route path="/poker" element={<PokerPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChipProvider>   
      <App />
    </ChipProvider>
  </StrictMode>
);
