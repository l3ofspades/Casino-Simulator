const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/auth`;

export async function register(username, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.token) {
        const safeUser = {
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(safeUser));
    }
    
    return data;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}