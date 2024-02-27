import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookie] = useCookies(['employee_token']);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(role, username, password);
        axios
            .post('http://localhost:3001/auth/login', { role, username, password })
            .then((response) => {
                alert('Logged in');
                setCookie('employee_token', response.data.token);
                window.localStorage.setItem('employeeID', response.data.employeeID);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
                alert('Error logging in');
            });
    };

    // Sign in form
    return (
        <div className="auth-container">
            <h1>Sign In</h1>
            <div className="auth-div">
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                </select>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
            </div>
        </div>
    );
};

export default Auth;
