import React, { useState } from 'react';
import { registerUser, registerUser2 } from '../../api';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import faceIO from '@faceio/fiojs'

const AddUser = () => {

    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [biometricData, setBiometricData] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [setFaceId] = useState('');
    const [facesuccess, setfacesuccess] = useState(false);

    let faceio;

    useEffect(() => {
        faceio = new faceIO("fioa6b02");
    }, []);

    const handleNewFaceUser = async () => {
        try {
            let response = await faceio.enroll({
                locale: "auto"
            });
            setFaceId(response.facialId);
            setfacesuccess(true);
            console.log(facesuccess);
        } catch (error) {
            console.log("error", error);
            if (error === 20) {
                setErrors({ ...errors, accountExistString: "Your account exists, Please Sign In" });
            }
            if (error === 9 || error === 6) {
                setErrors({ ...errors, accountExistString: "Something went wrong! Please try again!" });
            }
            if (error === 13) {
                window.location.reload();
            }
        }
    };

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
        }, 2000);
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
        console.log((value < 0), isNaN(value));
        if (value < 0 || !phoneNumberRegex.test(value)) {
            setErrors({ ...errors, salary: 'Salary must be a positive value' });
        } else {
            setErrors({ ...errors, salary: '' });
        }
    };

    const handleScanBiometricData = async () => {
        try {
            const device = await navigator.usb.requestDevice({ filters: [] });
            await device.open();
            await device.selectConfiguration(1);
            await device.claimInterface(0);
            await device.connect()
            // Code to interact with USB device and capture biometric data
            // For simplicity, let's assume biometric data is captured as a string
            setBiometricData("Captured biometric data");
            setSuccess(true);
            // Whomever is using this code need to add their own drivers to this
        } catch (error) {
            console.error("Error accessing USB device:", error);
            // Handle error
            setErrors({ ...errors, biometricData: "Device/drivers not found" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        if (facesuccess === false) {
            console.log("face success")
            return
        }
        if (errors.password || errors.email || errors.pnumber || errors.salary || errors.biometricData) {
            return;
        }
        try {
            if (biometricData) {
                await registerUser2({ role, username, fname, lname, salary, email, pnumber, password, biometricData });
            } else {
                await registerUser({ role, username, fname, lname, salary, email, pnumber, password });
            }
            showAlert(username);
            setSuccess(true);
        } catch (error) {
            setErrors({ user: error.message });
        }
        setErrors({});
    };

    return (
        <div className="container auth-container">
            <h1 className='leave__leave-request-title'>Add New User</h1>
            {!facesuccess && <button className="button button2" onClick={handleNewFaceUser} type="submit">Add Face of User</button>}
            {facesuccess && <form className="auth-form" onClick={handleSubmit}>
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
                <button className="button button2" type="button" onClick={handleScanBiometricData}>Scan Biometric Data</button>
                {success && <p className="success-message">Biometric data captured successfully</p>}
                {errors.biometricData && <p className="error-message">{errors.biometricData}</p>}
                {facesuccess && success && <p className="success-message">User Added</p>}
                {facesuccess && <button className="button button2" type="submit">Add User</button>}

            </form>}
        </div>
    );
};

export default AddUser;