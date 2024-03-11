import React from 'react';
import { Link } from 'react-router-dom';
import AttendanceDetails from './AttendanceDetails';
import './dashboard.css';

const EmployeeDashboard = () => {
    return (
        <div className="container2">
            <h1 className="dashboard-title">Employee Dashboard</h1>
            <AttendanceDetails />
            <div className="action-section">
                <div className="action-item">
                    <h2>View Attendance</h2>
                    <Link to="/employee/attendance-records" className="dashboard-link">
                        <button className="dashboard-button">View Attendance</button>
                    </Link>
                </div>
                <div className="action-item">
                    <h2>Mark Attendance</h2>
                    <Link to="/employee/mark-attendance" className="dashboard-link">
                        <button className="dashboard-button">Mark Attendance</button>
                    </Link>
                </div>
                <div className="action-item">
                    <h2>Apply for Leave</h2>
                    <Link to="/employee/applyLeave" className="dashboard-link">
                        <button className="dashboard-button">Apply</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
