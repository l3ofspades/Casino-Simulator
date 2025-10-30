import { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext.jsx'; 

export default function LoginPage() {
  const { login: authLogin } = useAuth(); // Renamed to avoid naming conflict
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password); 
      if (data.token) {
        // Save login state globally
        authLogin(data.user, data.token);
        setMessage(' Login successful!');
        window.location.href = '/'; // redirect to home
      } else {
        setMessage(data.message || ' Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(' Server error. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login to Casino Simulation</h2>
      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', padding: '8px', width: '250px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}
