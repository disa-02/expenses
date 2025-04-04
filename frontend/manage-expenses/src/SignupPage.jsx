import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from './api/AuthService';
import './styles/SignUp.css'

export const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      const credentials = {username, password}
      const response = await AuthService.signup(credentials)
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
    <div className="signupContainer">
      <h1>Sign Up</h1>
      {error && 
      <p className='errorMessage'> 'Invalid username or password. Please try again.' </p>
      }
      <form onSubmit={handleSignup}>
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
        <button type="submit" className="submitButton">Sign up</button>
      </form>
    </div>
  );
}
