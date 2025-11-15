import { useNavigate } from "react-router-dom";

export default function PlayAgain({ onPlayAgain }) {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={onPlayAgain}>Play Again</button>
      <button onClick={() => navigate("/")}>🏠 Back to Casino</button>
    </div>
  );
}
