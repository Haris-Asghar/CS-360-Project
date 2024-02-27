import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(role, username, password, fname, lname, salary, email, pnumber);
        axios
            .post('http://localhost:3001/auth/register', {role, username, fname, lname, salary, email, pnumber, password})
            .then((response) => {
                alert('User Added');
            })
            .catch((error) => {
                console.log(error);
                alert('Error adding in new User');
            });
    };

    // Registration form
    return (
        <div className="auth-container">
            <h1>Add New User</h1>
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
                <label htmlFor="fname">First Name</label>
                <input
                    type="text"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
                <label htmlFor="salary">Salary</label>
                <input
                    type="number"
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="pnumber">Phone Number</label>
                <input
                    type="text"
                    id="pnumber"
                    value={pnumber}
                    onChange={(e) => setPnumber(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
            </div>
        </div>
    );
};

export default AddUser;