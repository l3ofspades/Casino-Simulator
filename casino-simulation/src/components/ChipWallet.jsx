import { useEffect, useState } from 'react';
import { useChips } from '../context/ChipContext';

export default function ChipWallet() {
   const { chips, modifyChips, loading } = useChips();
    const [amount, setAmount] = useState('');

    if (loading) {
        return <div>Loading chip balance...</div>;
    }

    useEffect(() => {
        async function fetchChips() {
            try {
                const data = await getChips();
                setChips(data.chips);
            } catch (error) {
                console.error('Failed to fetch chip balance:', error);
            }
        }
        fetchChips();
    }, []);

  const handleUpdate = async (change) => {
    try {
      const data = await updateChips(change);
      setChips(data.chips); // ✅ update the state so UI reflects new balance
      setAmount('');
    } catch (error) {
      console.error('Failed to update chip balance:', error);
    }
  };

    return (
        <div style={{ marginBottom: 20, fontWeight: 'bold' }}>
            <p>Virtual Chips: {chips}</p>
            <div>
                <input
                type="number"
                value={amount}
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
                style={{ marginRight: 10 }}
                />
                <button onClick={() => handleUpdate(Number(amount))}>Add Chips</button>
                <button onClick={() => handleUpdate(-Number(amount))} style={{ marginLeft: 10 }}>Remove Chips</button>
            </div>
        </div>
    );
}

