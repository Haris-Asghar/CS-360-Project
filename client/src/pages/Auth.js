import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/User_Context';
import Swal from 'sweetalert2';

const Auth = () => {
    const { setUser } = useContext(UserContext);
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const showAlert = (username) => {
        Swal.fire({
            title: 'Successful!',
            text: `Welcome! ${username}`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/auth/login', { role, username, password })
            .then((response) => {
                showAlert(username);
                setUser({ "username": username, "role": role });
                if (response.data.employeeRole === 'Admin') {
                    navigate('/admin/home');
                }
                else {
                    navigate('/employee/home');
                }
            })
            .catch((error) => {
                setErrors({ user: error.response.data });
            });
        setErrors({});
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
                        required
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
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.user && <p className="error-message">{errors.user}</p>}
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;