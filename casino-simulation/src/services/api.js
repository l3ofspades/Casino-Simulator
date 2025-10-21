const API_URL = "http://localhost:5000/api";

export async function logGameResult(player, game, bet, result, netChange) {
    try {
        const res = await fetch(`${API_URL}/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                player,
                game,
                bet,
                result,
                netChange,
            }),
        });
        if (!res.ok) {
            throw new Error('Failed to log game result');
        }
        return await res.json();
    } catch (error) {
        console.error('Error logging game result:', error);
    }
}
