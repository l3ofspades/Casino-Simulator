import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import BlackjackPage from './pages/BlackjackPage.jsx';
import PokerPage from './pages/PokerPage.jsx';
import RoulettePage from './pages/RoulettePage.jsx';
import { ChipProvider } from './context/ChipContext.jsx';
import GameHistoryPage from './pages/GameHistoryPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import "./assets/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blackjack" element={<BlackjackPage />} />
        <Route path="/poker" element={<PokerPage />} />
        <Route path="/roulette" element={<RoulettePage />} />



        <Route
         path="/history"
          element={
            <ProtectedRoute>
              <GameHistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ChipProvider>   
      <App />
    </ChipProvider>
    </AuthProvider>
  </StrictMode>
);
