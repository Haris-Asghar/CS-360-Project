import axios from 'axios';

// General functions
export const login = async ({ role, username, password }) => {
    try {
        const response = await axios.post('https://cs-360.vercel.app/auth/login', { role, username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Employee Side functions
export const fetchAttendanceData = async (username) => {
    try {
        const response = await axios.get(`https://cs-360.vercel.app/attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const markAttendance = async (username) => {
    try {
        await axios.post('https://cs-360.vercel.app/log/log-attendance', { username });
    } catch (error) {
        throw new Error('Attendance already marked for the day!');
    }
};

export const fetchAttendanceInfo = async (username) => {
    try {
        const response = await axios.get(`https://cs-360.vercel.app/attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const submitLeaveRequest = async (leaveData) => {
    try {
        const response = await axios.post('https://cs-360.vercel.app/leave/submit-leave', leaveData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to submit leave request.');
    }
};

export const fetchEmployeeLeaveHistory = async (username) => {
    try {
        const response = await axios.get(`https://cs-360.vercel.app/leave/leave-request/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch leave history.');
    }
};

// Admin Side functions
export const registerUser = async (userData) => {
    try {
        const response = await axios.post('https://cs-360.vercel.app/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const fetchLeaveHistory = async () => {
    try {
        const response = await axios.get('https://cs-360.vercel.app/leave/leave-requests');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch leave history.');
    }
};

export const handleApproveLeave = async (id) => {
    try {
        await axios.put(`https://cs-360.vercel.app/leave/approve-leave/${id}`);
    } catch (error) {
        throw new Error('Failed to approve leave.');
    }
};

export const handleRejectLeave = async (id) => {
    try {
        await axios.put(`https://cs-360.vercel.app/leave/reject-leave/${id}`);
    } catch (error) {
        throw new Error('Failed to reject leave.');
    }
};