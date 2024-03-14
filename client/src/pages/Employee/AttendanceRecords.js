import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchAttendanceInfo } from './Utilities/api';
import "./Data.css"

const AttendanceRecords = () => {
    const { user } = useContext(UserContext);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendanceInfo(user.username);
                const currentDate = new Date();
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"];
                setCurrentMonth(monthNames[currentDate.getMonth()]);
                setAttendanceData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [user.username]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!attendanceData || !attendanceData.attendanceRecordsThisMonth.length) {
        return <div className="error">No attendance data available</div>;
    }

    const { attendanceRecordsThisMonth } = attendanceData;

    return (
        <div className="records">
            <h2>Attendance Records for {currentMonth}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceRecordsThisMonth.map((record, index) => (
                        <tr key={index}>
                            <td>{formatDate(record.logDate)}</td>
                            <td>{getDayOfWeek(record.logDate)}</td>
                            <td>{formatTime(record.logTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Function to get day of the week
const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
};

// Function to format time to AM/PM
const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
};

export default AttendanceRecords;
