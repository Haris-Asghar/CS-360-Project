import axios from 'axios';

const url = 'https://cs-360.vercel.app/';
// const url = "http://localhost:3001/";

// General functions
export const login = async ({ role, username, password }) => {
    try {
        const response = await axios.post(url + 'auth/login', { role, username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login2 = async ({ role, username, password, biometricdata }) => {
    try {
        const response = await axios.post(url + 'auth/login2', { role, username, password, biometricdata });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Employee Side functions
export const fetchAttendanceData = async (username) => {
    try {
        const response = await axios.get(url + `attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const markAttendance = async (username) => {
    try {
        await axios.post(url + 'log/log-attendance', { username });
    } catch (error) {
        throw new Error('Attendance already marked for the day!');
    }
};

export const markAttendance2 = async (biometricData) => {
    try {
        await axios.post(url + "log/log-attendance2", { biometricData });
    } catch (error) {
        throw new Error('Attendance already marked for the day!');
    }
};

export const fetchAttendanceInfo = async (username) => {
    try {
        const response = await axios.get(url + `attendance/attendance-info/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch attendance data.');
    }
};

export const submitLeaveRequest = async (leaveData) => {
    try {
        const response = await axios.post(url + 'leave/submit-leave', leaveData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const fetchEmployeeLeaveHistory = async (username) => {
    try {
        const response = await axios.get(url + `leave/leave-request/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch leave history.');
    }
};

// Admin Side functions
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(url + 'auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const registerUser2 = async (userData) => {
  try {
    const response = await axios.post(url + "auth/register2", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const fetchLeaveHistory = async () => {
    try {
        const response = await axios.get(url + 'leave/leave-requests');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch leave history.');
    }
};

export const handleApproveLeave = async (id) => {
    try {
        await axios.put(url + `leave/approve-leave/${id}`);
    } catch (error) {
        throw new Error('Failed to approve leave.');
    }
};

export const handleRejectLeave = async (id) => {
    try {
        await axios.put(url + `leave/reject-leave/${id}`);
    } catch (error) {
        throw new Error('Failed to reject leave.');
    }
};

export const employeeInfo = async () => {
  try {
    const response = await axios.get(url + `present/all_employee_info`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get employeeInfo.");
  }
};

export const fetchPresentEmployeesAttendance = async () => {
    try {
        const response = await axios.get(url + 'attendance/present-employees');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch present employees attendance.');
    }
};

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(url + 'list/list-of-all-employees');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all employees.');
    }
}