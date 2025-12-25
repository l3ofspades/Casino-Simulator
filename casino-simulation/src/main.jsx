import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ChipProvider } from './context/ChipContext.jsx';
import "./assets/index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ChipProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChipProvider>
    </AuthProvider>
  </StrictMode>
);
