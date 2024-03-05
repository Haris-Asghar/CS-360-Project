import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/User_Context';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <div>
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            <h1>Welcome to Employee Attendance System</h1>
            <button onClick={() => navigate('/admin/addUser')}>Add New Users</button>
            <div></div>
            <button onClick={() => navigate('/admin/leaveOfAll')}>View Leaves of All Employees</button>
        </div>
    );
};

export default AdminDashboard;
