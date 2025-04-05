import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from './api/AuthService';
import './styles/LogIn.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const credentials = {username, password}
      const response = await AuthService.login(credentials)
      const token = response.jwt;
      const id = response.id
      localStorage.setItem('authToken', token)
      localStorage.setItem('userId', id)
      navigate('/dashboard');
    }catch(error){
      setError(true)
      console.log(error)
    }
  };

  return (
    <div className="loginContainer">
      <h1>Log In</h1>
      {error && 
      <p className='errorMessage'> 'Login failed. Please check your credentials.' </p>
      }
      <form onSubmit={handleLogin}>
        <div className="formGroup">
          <label>User:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submitButton">Log In</button>
      </form>

    </div>
  );
};

