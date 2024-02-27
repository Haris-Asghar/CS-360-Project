import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        setSuccess(false);
        e.preventDefault();
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrors({ password: 'Password must be at least 8 characters long and contain at least 1 digit and 1 special character' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ email: 'Invalid email address' });
            return;
        }
        const phoneNumberRegex = /^[0-9]+$/;
        console.log(pnumber.length < 11 || !phoneNumberRegex.test(pnumber));
        if (pnumber.length < 11 || !phoneNumberRegex.test(pnumber)) {
            setErrors({ pnumber: 'Phone number must be at least 11 digits long and contain only numbers' });
            return;
        }
        axios
            .post('http://localhost:3001/auth/register', {role, username, fname, lname, salary, email, pnumber, password})
            .then((response) => {
                alert('User Added');
                setSuccess(true);
            })
            .catch((error) => {
                setErrors({ user: error.response.data });
            });
        setErrors({});
    };

    return (
        <div className="auth-container">
            <h1>Add New User</h1>
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
                    {errors.user && <p className="error-message">{errors.user}</p>}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        required
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        required
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        id="salary"
                        required
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <label htmlFor="pnumber">Phone Number</label>
                    <input
                        type="text"
                        id="pnumber"
                        required
                        value={pnumber}
                        onChange={(e) => setPnumber(e.target.value)}
                    />
                    {errors.pnumber && <p className="error-message">{errors.pnumber}</p>}
                    {success && <p className="success-message">User Added</p>}
                    <button type="submit">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;