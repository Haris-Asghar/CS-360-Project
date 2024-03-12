import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import { formatCurrentDateTime } from './Utilities/dateUtils';
import { fetchAttendanceData } from './Utilities/api';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AttendanceDetails = () => {
    const { user } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState(formatCurrentDateTime(true));
    const [currentDate, setCurrentDate] = useState(formatCurrentDateTime(false));
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState('');
    const leavesAllowed = 3;
    const [leavePercentage, setLeavePercentage] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(formatCurrentDateTime(true));
            setCurrentDate(formatCurrentDateTime(false));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendanceData(user.username);
                setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
                setAttendanceData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [user.username]);

    useEffect(() => {
        if (attendanceData) {
            setLeavePercentage((attendanceData.numAbsencesThisMonth / leavesAllowed) * 100);
            setAttendancePercentage((attendanceData.numAttendancesThisMonth / attendanceData.totalDaysThisMonth) * 100);
        }
    }, [attendanceData, leavesAllowed]);

    return (
        <div>
            <div className='dashboard__clock__and__progress'>
                <div className='card dashboard__clock'>
                    <p>{currentTime}</p>
                    <h2>Today</h2>
                    <p>{currentDate}</p>
                </div>
                <div className='dashboard__progress'>
                    <div className='card'>
                        Leaves
                        {attendanceData ? (
                            <div className='progress__bar'>
                                <CircularProgressbar value={leavePercentage} text={`${attendanceData.numAbsencesThisMonth}/${leavesAllowed}`} />
                            </div>
                        ) : <div className="loading">Loading...</div>}
                    </div>
                    <div className='card'>
                        Attendance
                        {attendanceData ? (
                            <div className='progress__bar'>
                                <CircularProgressbar value={attendancePercentage} text={`${attendanceData.numAttendancesThisMonth}/${attendanceData.totalDaysThisMonth}`} />
                            </div>
                        ) : <div className="loading">Loading...</div>}
                    </div>
                </div>
            </div>
            <h2>Attendance Summary for {currentMonth}</h2>
            {!loading && !error && attendanceData && (
                <>
                    <p>Total Days of Job: {attendanceData.totalDaysThisMonth}</p>
                    <p>Number of Attendances: {attendanceData.numAttendancesThisMonth}</p>
                    <p>Number of Absences: {attendanceData.numAbsencesThisMonth}</p>
                    <p>Number of Leaves Allowed: 3</p>
                    <p>Number of Leaves Remaining: {attendanceData.numLeavesRemaining}</p>
                </>
            )}
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !attendanceData && <div className="error">No attendance data available</div>}
        </div>
    );
};

export default AttendanceDetails;
