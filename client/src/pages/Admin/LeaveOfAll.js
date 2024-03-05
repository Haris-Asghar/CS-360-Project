import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css'; // Import CSS file

const AdminDashboard = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/leave/leave-requests');
                setLeaveHistory(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLeaveHistory();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="leave-history">
                <h2>Leave History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map((leave, index) => (
                            <tr key={index} className={leave.status.toLowerCase()}>
                                <td>{leave.username}</td>
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td>{leave.leaveReason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
