import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/User_Context';

const formatCurrentDateTime = (showTime) => {
    const currentDate = new Date();
    if (showTime) {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return currentDate.toLocaleTimeString('en-US', options);
    } else {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const day = currentDate.getDate();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
        return formattedDate.replace(',', suffix + ',');
    }
};
const AttendanceDetails = () => {
    const [currentTime, setCurrentTime] = useState(formatCurrentDateTime(true));
    const [currentDate, setCurrentDate] = useState(formatCurrentDateTime(false));
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(formatCurrentDateTime(true));
            setCurrentDate(formatCurrentDateTime(false));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
        <div>
            <div className='dashboard__clock__and__progress'>
                <div className='card dashboard__clock'>
                    <p>{currentTime}</p>
                    <h2>Today</h2>
                    <p>{currentDate}</p>
                </div>
                <div className='dashboard__progress'>
                    <h2>Attendance Progress</h2>
                    <p>Progress Bar</p>
                </div>
            </div>
            <h2>Attendance Summary for {currentMonth}</h2>
            <p>Total Days of Job: {totalDaysThisMonth}</p>
            <p>Number of Attendances: {numAttendancesThisMonth}</p>
            <p>Number of Absences: {numAbsencesThisMonth}</p>
            <p>Number of Leaves Allowed: 3</p>
            <p>Number of Leaves Remaining: {numLeavesRemaining}</p>
            <h2>View Attendance</h2>
        </div>
    );
};

export default AttendanceDetails;
