import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/history`;

export const saveGameHistory = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error saving game history:", error);
    throw error;
  }
};

export const getGameHistory = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game history:", error);
    throw error;
  }
};
