import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game.jsx';
import './components/Design.css'; // <-- import CSS without assigning it to a variable

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
