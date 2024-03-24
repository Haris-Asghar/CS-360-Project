import axios from 'axios';

export const fetchAttendanceData = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const markAttendance = async (username) => {
    try {
        await axios.post('http://localhost:3001/log/log-attendance', { username });
    } catch (error) {
        throw new Error('Attendance already marked for the day!');
    }
};

export const fetchAttendanceInfo = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const submitLeaveRequest = async (leaveData) => {
    try {
        const response = await axios.post('http://localhost:3001/leave/submit-leave', leaveData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to submit leave request.');
    }
};

export const fetchEmployeeLeaveHistory = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/leave/leave-request/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch leave history.');
    }
};