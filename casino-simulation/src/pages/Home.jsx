import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🎰 Casino Game Simulator</h1>

      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/blackjack">Blackjack</Link> |{" "}
        <Link to="/poker">Poker</Link> |{" "}
        <Link to="/roulette">Roulette</Link> |{" "}
        <Link to="/history">Game History</Link>
      </div>
    </div>
  );
}
