import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000"}/api/auth`;


export async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; 
  } catch (err) {
    console.error("Login API error:", err.response?.data || err.message);
    return { message: "Server error, please try again." };
  }
}

export async function register(username, email, password) {
  try {
    const res = await axios.post(`${API_URL}/register`, { username, email, password });
    return res.data;
  } catch (err) {
    console.error("Registration API error:", err.response?.data || err.message);
    return { message: "Server error, please try again." };
  }
}
