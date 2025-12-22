import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";

export default function GameHistoryPage() {
  const { currentUser } = useAuth();
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ wins: 0, losses: 0, totalNet: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const player = currentUser?.email || "Guest";

        const response = await fetch(`${BASE}/api/history/${player}`);
        const data = await response.json();

        setGameHistory(data);

        let wins = 0;
        let losses = 0;
        let totalNet = 0;

        data.forEach((entry) => {
          if (entry.result === "Win") wins++;
          else if (entry.result === "Loss") losses++;
          totalNet += entry.netChange;
        });

        setStats({ wins, losses, totalNet });
      } catch (error) {
        console.error("Failed to fetch game history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameHistory();
  }, [currentUser]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎲 Game History</h1>

      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Back to Game
      </button>

      {loading ? (
        <p>Loading game history...</p>
      ) : gameHistory.length === 0 ? (
        <p>No game history available.</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 0",
              backgroundColor: "#222",
              padding: "15px",
              borderRadius: "8px",
              color: "#fff",
            }}
          >
            <div>
              🏆 Wins: <span style={{ color: "lime" }}>{stats.wins}</span>
            </div>
            <div>
              💀 Losses: <span style={{ color: "red" }}>{stats.losses}</span>
            </div>
            <div>
              💰 Total Net:{" "}
              <span style={{ color: stats.totalNet >= 0 ? "lime" : "red" }}>
                {stats.totalNet}
              </span>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#333" }}>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #555",
                    color: "#fff",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #555",
                    color: "#fff",
                  }}
                >
                  Game
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #555",
                    color: "#fff",
                  }}
                >
                  Bet
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #555",
                    color: "#fff",
                  }}
                >
                  Result
                </th>
                <th
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #555",
                    color: "#fff",
                  }}
                >
                  Net Change
                </th>
              </tr>
            </thead>

            <tbody>
              {gameHistory.map((entry) => (
                <tr key={entry._id}>
                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {entry.game}
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {entry.bet}
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #555",
                      color:
                        entry.result === "Win"
                          ? "lime"
                          : entry.result === "Loss"
                          ? "red"
                          : "yellow",
                    }}
                  >
                    {entry.result}
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #555",
                      color: entry.netChange >= 0 ? "lime" : "red",
                    }}
                  >
                    {entry.netChange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
