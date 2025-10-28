

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//  Fetch current chip balance
export async function getChips() {
  const res = await fetch(`${API_URL}/chips`);
  if (!res.ok) throw new Error("Failed to fetch chips");
  return res.json();
}

//  Update chip balance (add/remove)
export async function updateChips(amount) {
  const res = await fetch(`${API_URL}/chips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error("Failed to update chips");
  return res.json();
}

//  Log game results to history
export async function logGameResult(player, game, bet, result, netChange) {
  const res = await fetch(`${API_URL}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player, game, bet, result, netChange }),
  });
  if (!res.ok) throw new Error("Failed to log game result");
  return res.json();
}

//  Fetch leaderboard data
export async function fetchLeaderboard(limit = 10) {
  const res = await fetch(`${API_URL}/leaderboard?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}
