import { useState } from 'react';
import { login } from '../services/auth';
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
      console.log("Login response from the backend:", data);
      
      if (data.token) {
        const safeUser = {
          _id: data.user._id,
          username: data.user.username,
          email: data.user.email,
        };

        // Save login state globally
        authLogin(safeUser, data.token);
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

<p>
  Don’t have an account?{" "}
  <a href="/register" style={{ color: "#00f", textDecoration: "underline" }}>
    Register here
  </a>
</p>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}
