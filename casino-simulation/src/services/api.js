const API_URL = "https://localhost:5000/api";

// Get Chip Balance

export async function getChips() {
    const res = await fetch(`${API_URL}/chips`);
    return res.json();
}

//Update Chip Balance

export async function updateChips(amount) {
    const res = await fetch(`${API_URL}/chips`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });
    return res.json();
}