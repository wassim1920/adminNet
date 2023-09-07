import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic with email and password
    console.log('Logging in with:', email, password);
  };

  const handleLoginWithGmail = () => {
    // Perform login with Gmail logic
    console.log('Logging in with Gmail');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <button className="login-with-gmail" onClick={handleLoginWithGmail}>
        Login with Gmail
      </button>
    </div>
  );
};

export default LoginForm;
