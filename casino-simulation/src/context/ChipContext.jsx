import { createContext, useContext, useState, useEffect } from 'react';
import { getChips, updateChips } from '../services/api';
import { useAuth } from './AuthContext';

const ChipContext = createContext();

export function ChipProvider({ children }) {
  const { currentUser } = useAuth();
  const [chips, setChips] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChips() {
      if (!currentUser) {
        setChips(0);
        setLoading(false);
        return;
      }

      try {
       
        const data = await getChips(currentUser._id);
        setChips(data.chips);
      } catch (error) {
        console.error('Failed to fetch chip balance:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChips();
  }, [currentUser]);

  const modifyChips = async (amount) => {
    try {
      
      const data = await updateChips(currentUser._id, amount);
      setChips(data.chips);
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
