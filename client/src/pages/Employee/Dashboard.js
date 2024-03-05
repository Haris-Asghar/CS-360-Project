import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './dashboard.css'; // Import CSS file
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';

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
                const currentDate = new Date();
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"];
                setCurrentMonth(monthNames[currentDate.getMonth()]);
                setAttendanceData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [user.username]); // Add user.username to dependency array

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const attendanceHandler = (e) => {
        e.preventDefault();
        const today = new Date();
        // Check if today is Saturday (6) or Sunday (0)
        if (today.getDay() === 6 || today.getDay() === 0) {
            showAlert("Error!", "Attendance cannot be marked on Saturdays and Sundays!", "error");
            return;
        }
        axios
            .post('http://localhost:3001/log/log-attendance', { username: user.username })
            .then((response) => {
                showAlert("Successful!", "Attendance Marked", "success");
            })
            .catch((error) => {
                showAlert("Error!", "Attendance already marked for the day!!", "error");
            });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!attendanceData) {
        return <div className="error">No data available</div>;
    }

    const { totalDaysThisMonth, numAttendancesThisMonth, numAbsencesThisMonth, numLeavesRemaining, attendanceRecordsThisMonth } = attendanceData;

    return (
        <div className="container">
            <h1>Employee Dashboard</h1>
            <div className="summary">
                <h2>Attendance Summary for {currentMonth}</h2>
                <p>Total Days of Job: {totalDaysThisMonth}</p>
                <p>Number of Attendances: {numAttendancesThisMonth}</p>
                <p>Number of Absences: {numAbsencesThisMonth}</p>
                <p>Number of Leaves Allowed: 3</p>
                <p>Number of Leaves Remaining: {numLeavesRemaining}</p>
            </div>
            <div className="records">
                <h2>Attendance Records for {currentMonth}</h2>
                <ul>
                    {attendanceRecordsThisMonth.map((record, index) => (
                        <li key={index}>
                            <p>Date: {record.logDate}</p>
                            <p>Time: {record.logTime}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mark-attendance">
                <h2>Mark Attendance</h2>
                <button onClick={attendanceHandler}>Mark</button>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
