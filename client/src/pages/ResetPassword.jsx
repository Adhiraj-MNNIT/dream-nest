import React, { useState } from 'react';
import { Link , useNavigate , useParams} from 'react-router-dom';
import "../styles/ForgotPass.scss";
import axios from 'axios'

const ResetPass = () => {
  const [password, setpassword] = useState('');
  const {id , token} = useParams()

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = `http://localhost:3001/reset-pass/${id}/${token}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Credentials': 'include' // Include credentials in the request
        },
        body: JSON.stringify({ password })
    };

    try {
        const response = await fetch(url, options);
        
        if (response.ok) {
            const data = await response.json();
            if (data.Status === "Success") {
                navigate('/login');
            }
        } else {
            console.error('Failed to reset password');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};


  return (
    <div className="forgotpass">
      <div className="forgotpass_content">
        <h2>Reset Password</h2>
        <form className="forgotpass_content_form" onSubmit={handleSubmit}>
          <label htmlFor="email">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;