import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ForgotPass.scss";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

 // axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/forgot-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Credentials': 'include' // Include credentials in the request
        },
        body: JSON.stringify({ email }) // Convert email to JSON string
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        if (data.Status === "Success") {
          navigate('/login');
        } else {
          // Handle other statuses if needed
          console.log(data.message);
        }
      } else {
        // Handle errors if the request fails
        console.error('Failed to send forgot password request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="forgotpass">
      <div className="forgotpass_content">
        <h2>Forgot Password</h2>
        <form className="forgotpass_content_form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass;
