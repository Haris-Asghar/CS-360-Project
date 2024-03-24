import React, { useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import PresentEmployeesTable from '../../components/Present_Employees_Table';
import MyClock from '../../components/Clock';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);

    // Dummy data for demonstration
    const presentEmployees = [
        { name: 'Employee 1', attendanceTime: '09:00 AM' },
        { name: 'Employee 2', attendanceTime: '09:15 AM' },
        { name: 'Employee 3', attendanceTime: '09:30 AM' },
    ];

    return (
        <div>
            {/* <AdminNavbar /> */}
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            <h1>Welcome to Employee Attendance System</h1>
            <div className="clock-section">
                <h2>Clock</h2>
                <MyClock />
            </div>
            <PresentEmployeesTable presentEmployees={presentEmployees} />
        </div>
    );
};

export default AdminDashboard;
