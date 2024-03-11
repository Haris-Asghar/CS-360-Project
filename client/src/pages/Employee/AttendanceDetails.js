import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/User_Context';

const AttendanceDetails = () => {
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
        <div className="summary">
            <h2>Attendance Summary for {currentMonth}</h2>
            <p>Total Days of Job: {totalDaysThisMonth}</p>
            <p>Number of Attendances: {numAttendancesThisMonth}</p>
            <p>Number of Absences: {numAbsencesThisMonth}</p>
            <p>Number of Leaves Allowed: 3</p>
            <p>Number of Leaves Remaining: {numLeavesRemaining}</p>
        </div>
    );
};

export default AttendanceDetails;
