import React, { useState } from 'react';
import './Roulette.css';
const numbers = [
  { number: 0, color: 'green' }, { number: 32, color: 'red' }, { number: 15, color: 'black' },
  { number: 19, color: 'red' }, { number: 4, color: 'black' }, { number: 21, color: 'red' },
  { number: 2, color: 'black' }, { number: 25, color: 'red' }, { number: 17, color: 'black' },
  { number: 34, color: 'red' }, { number: 6, color: 'black' }, { number: 27, color: 'red' },
  { number: 13, color: 'black' }, { number: 36, color: 'red' }, { number: 11, color: 'black' },
  { number: 30, color: 'red' }, { number: 8, color: 'black' }, { number: 23, color: 'red' },
  { number: 10, color: 'black' }, { number: 5, color: 'red' }, { number: 24, color: 'black' },
  { number: 16, color: 'red' }, { number: 33, color: 'black' }, { number: 1, color: 'red' },
  { number: 20, color: 'black' }, { number: 14, color: 'red' }, { number: 31, color: 'black' },
  { number: 9, color: 'red' }, { number: 22, color: 'black' }, { number: 18, color: 'red' },
  { number: 29, color: 'black' }, { number: 7, color: 'red' }, { number: 28, color: 'black' },
  { number: 12, color: 'red' }, { number: 35, color: 'black' }, { number: 3, color: 'red' },
  { number: 26, color: 'black' },
];

export default function Roulette() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const segmentAngle = 360 / numbers.length;
    const spins = 5;
    const newAngle = 360 * spins + randomIndex * segmentAngle + segmentAngle / 2;

    setSpinning(true);
    setAngle(newAngle);

    setTimeout(() => {
      setResult(numbers[randomIndex]);
      setSpinning(false);
    }, 5000);
  };

  const segmentAngle = 360 / numbers.length;

  return (
    <div className="roulette-container">
      <h2>Roulette</h2>
 

      <div className="roulette-wheel" style={{ transform: `rotate(${angle}deg)`, transition: 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)' }}>
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`roulette-segment ${num.color}`}
            style={{
              transform: `rotate(${index * segmentAngle}deg) skewY(-60deg)`,
            }}
          >
            <div
              style={{
                transform: `skewY(60deg) rotate(${segmentAngle / 2}deg) translateY(-50%)`,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              {num.number}
            </div>
          </div>
        ))}
      </div>

      <button onClick={spinWheel} disabled={spinning} style={{ marginTop: '20px' }}>
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {result && (
        <h3 style={{ marginTop: '20px', color: result.color }}>
          Result: {result.number} ({result.color})
        </h3>
      )}
    </div>
  );
}
