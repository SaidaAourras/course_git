// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Sample authentication; replace this with your actual authentication logic
    if (email === 'admin@example.com' && password === 'admin') {
      dispatch(login({ user: { name: 'Admin' }, role: 'admin' }));
      navigate('/courses');
    } else if (email === 'user@example.com' && password === 'user') {
      dispatch(login({ user: { name: 'User' }, role: 'user' }));
      navigate('/courses');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container my-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
