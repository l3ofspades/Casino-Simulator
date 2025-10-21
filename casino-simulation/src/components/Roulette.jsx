import React, { useState, useEffect } from 'react';
import { useChips } from '../context/ChipContext';
import { logGameResult } from '../services/api';

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
  const { chips, modifyChips } = useChips();
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState('');
  const [betType, setBetType] = useState('color');
  const [choice, setChoice] = useState('red');
  const [message, setMessage] = useState('');



  useEffect(() => {
    if (betType === 'color') setChoice('red');
    if (betType === 'number') setChoice('0');
    if (betType === 'evenodd') setChoice('even');
    if (betType === 'lowhigh') setChoice('low');
  }, [betType]);

  const spinWheel = () => {
    const betAmount = parseInt(bet);
    if (!betAmount || betAmount <= 0 || betAmount > chips) {
      setMessage('Please place a valid bet.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const landedNumber = numbers[randomIndex];
    const segmentAngle = 360 / numbers.length;
    const spins = 5;
    const newAngle = 360 * spins + randomIndex * segmentAngle + segmentAngle / 2;

    setSpinning(true);
    setAngle(newAngle);

    setTimeout(() => {
      setResult(landedNumber);
      setAngle(newAngle);

      let winnings = 0;
      switch (betType) {
        case 'color':
          if (choice === landedNumber.color)
            winnings = choice === 'green' ? betAmount * 14 : betAmount * 2;
          break;
        case 'number':
          if (parseInt(choice) === landedNumber.number)
            winnings = betAmount * 36;
          break;
        case 'evenodd':
          if (choice === 'even' && landedNumber.number !== 0 && landedNumber.number % 2 === 0)
            winnings = betAmount * 2;
          if (choice === 'odd' && landedNumber.number % 2 === 1)
            winnings = betAmount * 2;
          break;
        case 'lowhigh':
          if (choice === 'low' && landedNumber.number >= 1 && landedNumber.number <= 18)
            winnings = betAmount * 3;
          if (choice === 'high' && landedNumber.number >= 19 && landedNumber.number <= 36)
            winnings = betAmount * 3;
          break;
        default:
          break;
      }

      if (winnings > 0) {
        modifyChips(winnings);
        setMessage(`You WON! Landed on ${landedNumber.color} (${landedNumber.number}). You earned ${winnings} chips.`);
        logGameResult('Win', betAmount, winnings);
      } else {
        modifyChips(-betAmount);
        setMessage(`You lost. Landed on ${landedNumber.color} (${landedNumber.number}).`);
        logGameResult('Loss', betAmount, -betAmount);
      }

      setSpinning(false);
    }, 5000);
  };

  let choiceOptions = [];
  if (betType === 'color') choiceOptions = ['red', 'black', 'green'];
  if (betType === 'number') choiceOptions = numbers.map(n => n.number.toString());
  if (betType === 'evenodd') choiceOptions = ['even', 'odd'];
  if (betType === 'lowhigh') choiceOptions = ['low', 'high'];

  return (
    <div className="game-container">
      <h2>Roulette</h2>

      <div className="roulette-container">
        <img
          src="/Wheel.png"
          alt="Roulette Wheel"
          className="roulette-wheel"
          style={{ transform: `rotate(${angle}deg)` }}
        />
      </div>

      <div className="bet-controls">
        <input
          type="number"
          placeholder="Enter bet"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          disabled={spinning}
        />

        <select value={betType} onChange={(e) => setBetType(e.target.value)} disabled={spinning}>
          <option value="color">Color</option>
          <option value="number">Number</option>
          <option value="evenodd">Even/Odd</option>
          <option value="lowhigh">Low/High</option>
        </select>

        <select value={choice} onChange={(e) => setChoice(e.target.value)} disabled={spinning}>
          {choiceOptions.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <button onClick={spinWheel} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {message && <p className="message">{message}</p>}
      {result && <h3 style={{ color: result.color }}>Result: {result.number} ({result.color})</h3>}
    </div>
  );
}
