import axios from 'axios';

const API_URL = 'http://localhost:5000/api/history';

export const saveGameHistory = async (data) => {
    try {
       const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error saving game history:', error);
        throw error;
    }
};

export const getGameHistory = async (player) => {
    try {
        const response = await axios.get(`${API_URL}/${player}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching game history:', error);
        throw error;
    }
};