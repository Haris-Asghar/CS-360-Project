import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchAttendanceInfo } from '../../api';
import { formatDate, getDayOfWeek, formatTime } from './Utilities/dateUtils';

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

    const convertJsonToCsv = () => {
        const jsonData = attendanceData.attendanceRecordsThisMonth;

        // Extract headers from the first object in jsonData
        const headers = Object.keys(jsonData[0]);

        // Construct CSV content with headers
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n";

        // Add data rows
        csvContent += jsonData.map(row => Object.values(row).join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${user.username}_${currentMonth}_attendance.csv`);
        document.body.appendChild(link);
        link.click();
    };

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
            <button className='button button__margin' onClick={convertJsonToCsv}>Download CSV</button>
        </div>
    );
};


export default AttendanceRecords;
