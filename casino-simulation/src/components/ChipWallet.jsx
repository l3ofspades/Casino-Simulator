import { useEffect, useState } from 'react';
import { useChips } from '../context/ChipContext';
import { useAuth } from '../context/AuthContext';

export default function ChipWallet() {
    const { chips, modifyChips, loading } = useChips();
    const { currentUser } = useAuth();
    

   if (loading) {
        return <div style={{ color: '#ccc' }}>Loading chips...</div>;
    }

    const handleUpdate = async (change) => {
        try {
            await modifyChips(change);
        } catch (error) {
            console.error('Error updating chips:', error);
        }
    };

    return (
        <div style={{
            marginBottom: 10,
            fontWeight: 'bold',
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '10px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            width: 'fit-content',
        }}
        >💰 {' '}
        <span style={{ color: '#00ff7f' }}>{chips}</span>

    {chips <= 0 && (
        <div style={{ marginTop: 10, color: 'red' }}>
          You’re out of chips!
          <button
            onClick={() => handleUpdate(1000)}
            style={{
              marginLeft: 10,
              background: '#222',
              color: '#fff',
              border: '1px solid #555',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: '0.2s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#444')}
            onMouseOut={(e) => (e.target.style.background = '#222')}
          >
            Refill 1000
          </button>
        </div>
      )}
    </div>
  );
}
