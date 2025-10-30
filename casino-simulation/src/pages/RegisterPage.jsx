import { useState } from 'react';
import { register } from '../api/auth';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await register(username, email, password);
        if (response.message === 'User registered successfully') {
            setMessage('Registration successful! You can now log in.');
            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            setMessage(response.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username:</label><br />
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: 'block', padding: '8px', width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ display: 'block', padding: '8px', width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', padding: '8px', width: '300px' }}
                    />
                </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
    </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}