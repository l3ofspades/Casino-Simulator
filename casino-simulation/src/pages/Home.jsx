import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #1a1a1d, #0b0b0f)",
        color: "#f5f5f5",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "rgba(255,255,255,0.08)",
          padding: "40px 60px",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(0, 255, 127, 0.15)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow =
            "0 0 35px rgba(0, 255, 127, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 0 25px rgba(0, 255, 127, 0.15)";
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          🎰 Casino Game Simulator
        </h1>

        {user ? (
          <>
            <p>Welcome, {user.username}!</p>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "25px",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#c0392b")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#e74c3c")
              }
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              display: "inline-block",
              backgroundColor: "#00ff7f",
              color: "#000",
              fontWeight: "600",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              marginBottom: "25px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0, 255, 127, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Login to Get Started
          </Link>
        )}

    
        <div style={{ marginTop: "10px" }}>
          {["Blackjack", "Poker", "Roulette", "Game History"].map(
            (game, i) => (
              <Link
                key={i}
                to={ game === "Game History"
                  ? "/history"
                  : `/${game.toLowerCase().replace(" ", "")}`
                }
                style={{
                  color: "#00ff7f",
                  textDecoration: "none",
                  margin: "0 10px",
                  fontSize: "1.1rem",
                  transition: "color 0.3s ease, text-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.textShadow =
                    "0 0 10px #00ff7f, 0 0 20px #00ff7f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#00ff7f";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {game}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
