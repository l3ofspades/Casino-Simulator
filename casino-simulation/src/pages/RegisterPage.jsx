import { useState } from 'react';
import { register } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#00ff7f",
                        color: "#000",
                        fontWeight: "600",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        marginBottom: "10px",
                        transition: '0.3s',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#00cc66";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#00ff7f";
                    }}
                >
                    Register
                </button>

                <Link
                to="/login"
                style={{
                    display: "block",
                    textAlign: "center",
                    color: "#00ff7f",
                    textDecoration: "none",
                    marginTop: "10px",
                }}
                >
                Already have an account? Login
                </Link>
            </form>
            {message && <p style={{ marginTop: "20px" }}>{message}</p>}
        </div>
    );
}