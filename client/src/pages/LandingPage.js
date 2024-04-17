import React from 'react';

function Landing() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Group 9</h1>
                <p>Welcome to our Employee Leave Management System</p>
                <div className="use-cases">
                    <h2>Services we offer</h2>
                    <div className="use-case">
                        <img src="biometric.jpg" alt="Biometric Verification" />
                        <p>Biometric Verification</p>
                    </div>
                    <div className="use-case">
                        <img src="attendance.jpg" alt="Attendance Management" />
                        <p>Attendance Management</p>
                    </div>
                    <div className="use-case">
                        <img src="leave.jpg" alt="Leave Management" />
                        <p>Leave Management</p>
                    </div>
                </div>
            </header>
            <footer>
                <p>&copy; 2024 Group 9. All rights reserved.</p>
                <p>Contact us: contact@group9.com</p>
            </footer>
        </div>
    );
}

export default Landing;