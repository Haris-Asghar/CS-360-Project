import React from 'react';
import { Link } from 'react-router-dom';
import AttendanceDetails from './AttendanceDetails';

const EmployeeDashboard = () => {
    return (
        <div className='container'>
            <div className='dashboard_nav'>
                <h1>My Dashboard</h1>
                <div className='dashboard_links'>
                    <Link to="/employee/applyLeave">
                        <button className='button'>Request for Leave</button>
                    </Link>
                    <Link to="/employee/attendance-records">
                        <button className='button'>View Attendance</button>
                    </Link>
                    <Link to="/employee/mark-attendance">
                        <button className='button'>Mark Attendance</button>
                    </Link>
                </div>
            </div>
            <AttendanceDetails />
        </div>
    );
};

export default EmployeeDashboard;
