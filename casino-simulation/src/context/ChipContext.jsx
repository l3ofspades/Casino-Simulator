import { createContext, useContext, useState, useEffect } from 'react';
import { getChips, updateChips } from '../services/api';


const ChipContext = createContext();

export function ChipProvider({ children }) {
  const [chips, setChips] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChips() {
            try {
                const data = await getChips();
                setChips(data.chips);
            } catch (error) {
                console.error('Failed to fetch chip balance:', error);
            } finally {
                setLoading(false);
            }   
        }
        fetchChips();
    }, []);

    const modifyChips = async (amount) => {
        try {
            const data = await updateChips(amount);
            setChips(data.chips); // ✅ update the state so UI reflects new balance
        } catch (error) {
            console.error('Failed to update chip balance:', error);
        }
    };
    return (
        <ChipContext.Provider value={{ chips, modifyChips, loading }}>
            {children}
        </ChipContext.Provider>
    );
}

export function useChips() {
  return useContext(ChipContext);
}