import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchAttendanceInfo } from '../../api';
import { formatDate, getDayOfWeek, formatTime } from './Utilities/dateUtils';

const AdminAttendanceRecords = () => {
    const { username } = useParams()
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendanceInfo(username);
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
    }, [username]);

    if (loading) {
        return <div className="loader-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!attendanceData || !attendanceData.attendanceRecordsThisMonth.length) {
        return <div className="error">No attendance data available</div>;
    }

    const { attendanceRecordsThisMonth } = attendanceData;

    return (
        <div className='container'>
            <div className="employee__records">
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
        </div>
    );
};


export default AdminAttendanceRecords;
