import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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

    const showAlert = (username) => {
        Swal.fire({
            title: 'Successful!',
            text: `User ${username} added successfully!`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        // Reload the page after submission
        const timer = setTimeout(() => {
            window.location.reload();
            clearTimeout(timer);
        } , 2000);
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(value)) {
            setErrors({ ...errors, password: 'Password must be at least 8 characters long and contain at least 1 digit and 1 special character' });
        } else {
            setErrors({ ...errors, password: '' });
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setErrors({ ...errors, email: 'Invalid email address' });
        } else {
            setErrors({ ...errors, email: '' });
        }
    };

    const validatePhoneNumber = (value) => {
        const phoneNumberRegex = /^[0-9]+$/;
        if (value.length < 11 || !phoneNumberRegex.test(value)) {
            setErrors({ ...errors, pnumber: 'Phone number must be at least 11 digits long and contain only numbers' });
        } else {
            setErrors({ ...errors, pnumber: '' });
        }
    };

    const validateSalary = (value) => {
        const phoneNumberRegex = /^[0-9]+$/;
        console.log((value < 0 ), isNaN(value));
        if (value < 0 || !phoneNumberRegex.test(value)) {
            setErrors({ ...errors, salary: 'Salary must be a positive value' });
        } else {
            setErrors({ ...errors, salary: '' });
        }
    };

    const handleSubmit = (e) => {
        setSuccess(false);
        e.preventDefault();
        //  check if no errors, otherwise return
        if (errors.password || errors.email || errors.pnumber || errors.salary) {
            return;
        }
        axios
            .post('https://cs-360.vercel.app/auth/register', {role, username, fname, lname, salary, email, pnumber, password})
            .then((response) => {
                showAlert(username);
                setSuccess(true);
            })
            .catch((error) => {
                console.log(error)
                setErrors({ user: error.response.data });
            });
        setErrors({});
    };

    return (
        <div className="container auth-container">
            <h1 className='leave__leave-request-title'>Add New User</h1>
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
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
                        type="text"
                        id="salary"
                        required
                        value={salary}
                        onChange={(e) => {
                            setSalary(e.target.value);
                            validateSalary(e.target.value);
                        }}
                    />
                    {errors.salary && <p className="error-message">{errors.salary}</p>}
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    <label htmlFor="pnumber">Phone Number</label>
                    <input
                        type="text"
                        id="pnumber"
                        required
                        value={pnumber}
                        onChange={(e) => {
                            setPnumber(e.target.value);
                            validatePhoneNumber(e.target.value);
                        }}
                    />
                    {errors.pnumber && <p className="error-message">{errors.pnumber}</p>}
                    {success && <p className="success-message">User Added</p>}
                    <button className="button" type="submit">Add User</button>
                </form>
            </div>
    );
};

export default AddUser;