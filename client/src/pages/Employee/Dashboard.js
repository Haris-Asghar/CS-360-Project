import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/User_Context';
import './dashboard.css'; // Import CSS file

const EmployeeDashboard = () => {
    const { user } = useContext(UserContext);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/attendance/attendance-info/${user.username}`);
                setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
                setAttendanceData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch attendance data.');
                setLoading(false);
            }
        };
        fetchAttendanceData();
    }, [user.username]);


    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!attendanceData) {
        return <div className="error">No attendance data available</div>;
    }

    const { totalDaysThisMonth, numAttendancesThisMonth, numAbsencesThisMonth, numLeavesRemaining } = attendanceData;

    return (
        <div className="container2">
            <h1 className="dashboard-title">Employee Dashboard</h1>
            <div className="summary">
                <h2>Attendance Summary for {currentMonth}</h2>
                <p>Total Days of Job: {totalDaysThisMonth}</p>
                <p>Number of Attendances: {numAttendancesThisMonth}</p>
                <p>Number of Absences: {numAbsencesThisMonth}</p>
                <p>Number of Leaves Allowed: 3</p>
                <p>Number of Leaves Remaining: {numLeavesRemaining}</p>
            </div>
            <div className="action-section">
                <div className="action-item">
                    <h2>View Attendance</h2>
                    <Link to="/employee/attendance-records">
                        <button>View Attendance</button>
                    </Link>
                </div>
                <div className="action-item">
                    <h2>Mark Attendance</h2>
                    <Link to="/employee/mark-attendance">
                        <button>Mark Attendance</button>
                    </Link>
                </div>
                <div className="action-item">
                    <h2>Apply for Leave</h2>
                    <Link to="/employee/applyLeave">
                        <button>Apply</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
