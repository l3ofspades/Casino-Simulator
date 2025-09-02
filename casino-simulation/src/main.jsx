import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.jsx';
import './styles/Design.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
