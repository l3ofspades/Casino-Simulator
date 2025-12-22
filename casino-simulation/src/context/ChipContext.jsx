import { createContext, useContext, useState, useEffect } from 'react';
import { getChips, updateChips } from '../services/api';
import { useAuth } from './AuthContext';

const ChipContext = createContext();

export function ChipProvider({ children }) {
  const { currentUser } = useAuth();
  const [chips, setChips] = useState(() => {
    const stored = localStorage.getItem('guestChips');
    return stored !== null ? Number(stored) : 1000;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChips() {
      //Guest
      if (!currentUser) {
        const stored = localStorage.getItem('guestChips');
        const guestChips = stored !== null ? Number(stored) : 1000;
        setChips(guestChips);
        setLoading(false);
        return;
      }
 
// Logged in user
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
    // GUEST
    if (!currentUser) {
     setChips((prev) => {
  const next = Math.max(0, prev + amount);
  localStorage.setItem("guestChips", String(next));
  return next;
});
 return;
    }

    // LOGGED-IN USER
    try {
      const data = await updateChips(currentUser._id, amount);
      setChips(data.chips);
    } catch (error) {
      console.error("Failed to update chip balance:", error);
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
