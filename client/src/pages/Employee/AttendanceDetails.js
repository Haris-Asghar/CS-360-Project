import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/User_Context';
import { formatCurrentDateTime, datesFromTodayToStartOfMonth, datesMatcher } from './Utilities/dateUtils';
import { fetchAttendanceData } from '../../api';
import MyCalendar from "../../components/Calendar";
import Clock from 'react-clock';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-clock/dist/Clock.css';
import { BarChart } from '@mui/x-charts/BarChart';

const AttendanceDetails = () => {
    const { user } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState(formatCurrentDateTime(true));
    const [currentDate, setCurrentDate] = useState(formatCurrentDateTime(false));
    const [currentDay, setCurrentDay] = useState('');
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const leavesAllowed = 3;
    const [leavePercentage, setLeavePercentage] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState(0);
    const [markedDates, setMarkedDates] = useState([]);
    const [value, setValue] = useState(new Date());

    useEffect(() => {
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(formatCurrentDateTime(true));
            setCurrentDate(formatCurrentDateTime(false));
            setCurrentDay(new Date().toLocaleString('default', { weekday: 'long' }));
            setValue(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendanceData(user.username);
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
                    <div className='dashboard__clock__info'>
                        <Clock value={value} />
                        <time>{currentTime}</time>
                        <time>{currentDate}</time>
                        <p>{currentDay}</p>
                    </div>
                    <div className='dashboard_links'>
                        <Link to="/employee/applyLeave">
                            <button className='button'>Request for Leave</button>
                        </Link>
                        <Link to="/employee/mark-attendance">
                            <button className='button'>Mark Attendance</button>
                        </Link>
                    </div>
                </div>
                <div className='dashboard__progress'>
                    <div className='card progress'>
                        {attendanceData ? (
                            <div className='progress__bar'>
                                <CircularProgressbar
                                    value={leavePercentage}
                                    text={`${attendanceData.numAbsencesThisMonth}/${attendanceData.totalDaysThisMonth}`}
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
                        ) : <div className="loader-container"><div className="loader"></div></div>}
                        <div className='progress__text'>
                            <p className='progress_heading'>Absences</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Num of Absences:</td>
                                        <td>{attendanceData ? attendanceData.numAbsencesThisMonth : 0}</td>
                                    </tr>
                                    <tr>
                                        <td>Leaves Remaining:</td>
                                        <td>{attendanceData ? attendanceData.numLeavesRemaining : 0}</td>
                                    </tr>
                                    <tr>
                                        <td>Leaves Taken:</td>
                                        <td>{attendanceData ? attendanceData.numLeavesTaken : 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/employee/leaveHistory">
                                <button className='button'>View Leaves</button>
                            </Link>
                        </div>
                    </div>
                    <div className='card progress'>
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
                        ) : <div className="loader-container"><div className="loader"></div></div>}
                        <div className='progress__text'>
                            <p className='progress_heading'>Attendance</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Days of Job:</td>
                                        <td>{attendanceData ? attendanceData.totalDaysThisMonth : 0}</td>
                                    </tr>
                                    <tr>
                                        <td>Present:</td>
                                        <td>{attendanceData ? attendanceData.numAttendancesThisMonth : 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/employee/attendance-records">
                                <button className='button'>View Attendance</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {!loading && !error && attendanceData && (
                <div className='dashboard__calendar__and__graph'>
                    <div className='dashboard__calendar'>
                        <MyCalendar markedDates={markedDates} />
                    </div>
                    <div className='dashboard__graph'>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Days of Job', 'Present', 'Absent', "Leaves Taken"] }]}
                            series={[{ data: [attendanceData ? attendanceData.totalDaysThisMonth : 0, attendanceData ? attendanceData.numAttendancesThisMonth : 0, attendanceData ? attendanceData.numAbsencesThisMonth : 0,attendanceData ? attendanceData.numLeavesTaken : 0] }]}
                            width={500}
                            height={300}
                        />
                    </div>

                </div>
            )}
            {loading && <div className="loader-container"><div className="loader"></div></div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !attendanceData && <div className="error">No attendance data available</div>}
        </div>
    );
};

export default AttendanceDetails;
