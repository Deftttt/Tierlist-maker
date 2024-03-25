import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from '../../services/AuthService';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email, 
            password
        };

        try {
            const response = await login(formData);
            navigate('/users')

        } catch (error) {
          console.error('Error while logging in:', error);
        }

    };

    const handleLogout = () => {
        logout();
        alert("Token removed");
      };

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </form>
      </div>
    );
  
  };

  export default Login;