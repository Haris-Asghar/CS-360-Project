import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import PresentEmployeesTable from '../../components/Present_Employees_Table';
import MyClock from '../../components/Clock';
import { fetchPresentEmployeesAttendance } from '../../api';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const [presentEmployees, setPresentEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await fetchPresentEmployeesAttendance();
                console.log(data)
                setPresentEmployees(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <PresentEmployeesTable presentEmployees={presentEmployees} />}

        </div>
    );
};

export default AdminDashboard;
