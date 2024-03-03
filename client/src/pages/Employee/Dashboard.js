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

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/attendance/attendance-info/${user.username}`);
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
        axios
            .post('http://localhost:3001/log/log-attendance', { username: user.username })
            .then((response) => {
                showAlert("Successful!", "Attendance Marked", "success");
            })
            .catch((error) => {
                showAlert("Error!", error.message, "error");
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
                <h2>Attendance Summary for Current Month</h2>
                <p>Total Days This Month: {totalDaysThisMonth}</p>
                <p>Number of Attendances: {numAttendancesThisMonth}</p>
                <p>Number of Absences: {numAbsencesThisMonth}</p>
                <p>Number of Leaves Remaining: {numLeavesRemaining}</p>
            </div>
            <div className="records">
                <h2>Attendance Records for Current Month</h2>
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