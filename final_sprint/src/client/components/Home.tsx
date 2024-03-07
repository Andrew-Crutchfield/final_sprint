import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from '../services/fetcher';

const Home: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await POST('/auth/login', loginData);

      const { token } = response;

      localStorage.setItem('token', token);

      navigate('/booklisting');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>

      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />

      <label>Password:</label>
      <input
        type="password"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Home;
