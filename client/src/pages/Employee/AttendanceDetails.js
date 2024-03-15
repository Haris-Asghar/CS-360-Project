import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/User_Context';
import { formatCurrentDateTime, datesFromTodayToStartOfMonth, datesMatcher } from './Utilities/dateUtils';
import { fetchAttendanceData } from './Utilities/api';
import MyCalendar from "../../components/Calendar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
    const [markedDates, setMarkedDates] = useState([]);

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
                setMarkedDates(datesMatcher(datesFromTodayToStartOfMonth(), data.attendanceRecordsThisMonth));
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
        <div className='dashboard__details'>
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
                                <CircularProgressbar
                                    value={leavePercentage}
                                    text={`${attendanceData.numAbsencesThisMonth}/${leavesAllowed}`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#3e98c7",
                                        textColor: "#fff",
                                        pathColor: "#fff",
                                        trailColor: "transparent"
                                    })}
                                />
                            </div>
                        ) : <div className="loading">Loading...</div>}
                    </div>
                    <div className='card'>
                        Attendance
                        {attendanceData ? (
                            <div className='progress__bar'>
                                <CircularProgressbar
                                    value={attendancePercentage}
                                    text={`${attendanceData.numAttendancesThisMonth}/${attendanceData.totalDaysThisMonth}`}
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#3e98c7",
                                        textColor: "#fff",
                                        pathColor: "#fff",
                                        trailColor: "transparent"
                                    })}
                                />
                            </div>
                        ) : <div className="loading">Loading...</div>}
                    </div>
                </div>
                <div className='dashboard_links'>
                    <Link to="/employee/applyLeave">
                        <button className='button'>Request for Leave</button>
                    </Link>
                    <Link to="/employee/attendance-records">
                        <button className='button'>View Attendance</button>
                    </Link>
                    <Link to="/employee/mark-attendance">
                        <button className='button'>Mark Attendance</button>
                    </Link>
                </div>
            </div>
            {!loading && !error && attendanceData && (
                <div className='dashboard__calendar__and__graph'>
                    <div className='dashboard__calendar'>
                        <MyCalendar markedDates={markedDates} />
                    </div>
                    <div className='dashboard__graph'>
                        <h2>Attendance Details</h2>
                        <p>Month: {currentMonth}</p>
                        <p>Total Days of Job: {attendanceData.totalDaysThisMonth}</p>
                        <p>Number of Attendances: {attendanceData.numAttendancesThisMonth}</p>
                        <p>Number of Absences: {attendanceData.numAbsencesThisMonth}</p>
                        <p>Number of Leaves Allowed: 3</p>
                        <p>Number of Leaves Remaining: {attendanceData.numLeavesRemaining}</p>
                    </div>
                </div>
            )}
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !attendanceData && <div className="error">No attendance data available</div>}
        </div>
    );
};

export default AttendanceDetails;
