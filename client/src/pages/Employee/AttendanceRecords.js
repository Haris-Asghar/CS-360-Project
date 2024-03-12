import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchAttendanceInfo } from './Utilities/api';

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

    if (!attendanceData) {
        return <div className="error">No attendance data available</div>;
    }

    const { attendanceRecordsThisMonth } = attendanceData;

    return (
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
    );
};

export default AttendanceRecords;
