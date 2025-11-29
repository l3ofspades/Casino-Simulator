import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlackjackPage from "./pages/BlackjackPage";
import PokerPage from "./pages/PokerPage";
import RoulettePage from "./pages/RoulettePage";
import GameHistoryPage from "./pages/GameHistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
  );
}
