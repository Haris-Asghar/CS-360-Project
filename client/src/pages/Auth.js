import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/User_Context';
import { login, login2 } from '../api';
import Swal from 'sweetalert2';

const Auth = () => {
    const { setUser } = useContext(UserContext);
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [biometricData, setBiometricData] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (biometricData){
            try {
              const response = await login2({ role, username, password, biometricData });
              showAlert(username);
              setUser({ username: username, role: role });
              if (response.employeeRole === "Admin") {
                navigate("/admin/home");
              } else {
                navigate("/employee/home");
              }
            } catch (error) {
              setErrors({ user: error });
            }
        }else{
              try {
                const response = await login({ role, username, password });
                showAlert(username);
                setUser({ username: username, role: role });
                if (response.employeeRole === "Admin") {
                  navigate("/admin/home");
                } else {
                  navigate("/employee/home");
                }
              } catch (error) {
                setErrors({ user: error });
              }
        }

    };

    const handleScanBiometricData = async () => {
      try {
        const device = await navigator.usb.requestDevice({ filters: [] });
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);
        await device.connect();
        // Code to interact with USB device and capture biometric data
        // For simplicity, let's assume biometric data is captured as a string
        setBiometricData("Captured biometric data");
        // Whomever is using this code need to add their own drivers to this
      } catch (error) {
        console.error("Error accessing USB device:", error);
        // Handle error
        setErrors({ ...errors, biometricData: "Device/drivers not found" });
      }
    };

    // Sign in form
    return (
        <div className="container auth-container">
            <h1 className='leave__leave-request-title'>Sign In</h1>
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
                    <button className="button" type="button" onClick={handleScanBiometricData}>Scan Biometric Data</button>
                    {errors.biometricData && <p className="error-message">{errors.biometricData}</p>}
                    {errors.user && <p className="error-message">{errors.user}</p>}
                    <button className='button' type="submit">Sign In</button>
                </form>
            </div>
    );
};

export default Auth;