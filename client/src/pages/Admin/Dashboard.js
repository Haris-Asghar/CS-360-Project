// AdminDashboard.js

import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import { datesFromTodayToStartOfMonth, datesMatcher } from '../Admin/utilities/dateUtils';
import { fetchAttendanceData } from '../Admin/utilities/api';
// import AdminNavbar from '../../components/Admin_Navbar';
import PresentEmployeesTable from '../../components/Present_Employees_Table';
import MyCalendar from '../../components/Calendar';
import MyClock from '../../components/Clock';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const [markedDates, setMarkedDates] = useState([]);

    // Dummy data for demonstration
    const presentEmployees = [
        { name: 'Employee 1', attendanceTime: '09:00 AM' },
        { name: 'Employee 2', attendanceTime: '09:15 AM' },
        { name: 'Employee 3', attendanceTime: '09:30 AM' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAttendanceData(user.username);
                setMarkedDates(datesMatcher(datesFromTodayToStartOfMonth(), data.attendanceRecordsThisMonth));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user.username]);

    return (
        <div>
            {/* <AdminNavbar /> */}
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
            <h1>Welcome to Employee Attendance System</h1>
            <div className="calendar-section">
                <h2>Calendar</h2>
                <MyCalendar markedDates={markedDates} />
            </div>
            <div className="clock-section">
                <h2>Clock</h2>
                <MyClock />
            </div>
            <PresentEmployeesTable presentEmployees={presentEmployees} />
        </div>
    );
};

export default AdminDashboard;
