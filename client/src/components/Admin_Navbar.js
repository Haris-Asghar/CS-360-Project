// AdminNavbar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <button onClick={() => navigate('/admin/addUser')}>Add New Users</button>
            <button onClick={() => navigate('/admin/attendanceMarker')}>Mark Attendance</button>
            <button onClick={() => navigate('/admin/leaveRequest')}>View Leave Requests</button>
            <button onClick={() => navigate('/admin/attendanceRecords')}>View Attendance Records</button>
            <button onClick={() => navigate('/admin/leaveOfAll')}>View Leave History All Employees</button>
        </div>
    );
};

export default AdminNavbar;
