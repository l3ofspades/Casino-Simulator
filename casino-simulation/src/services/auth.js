const API_URL = 'http://localhost:5000/api/auth';

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
    if (data.token) localStorage.setItem('token', data.token);
    return data;
}

export function logout() {
    localStorage.removeItem('token');
}