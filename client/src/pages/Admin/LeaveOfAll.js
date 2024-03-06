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

    const handleApproveLeave = async (id) => {
        try {
            await axios.put(`http://localhost:3001/leave/approve-leave/${id}`);
            // Update leave history after approving leave
            const updatedLeaveHistory = leaveHistory.map(leave => {
                if (leave._id === id) {
                    leave.status = 'Approved';
                }
                return leave;
            });
            setLeaveHistory(updatedLeaveHistory);
        } catch (error) {
            console.error('Error approving leave:', error);
        }
    };

    const handleRejectLeave = async (id) => {
        try {
            await axios.put(`http://localhost:3001/leave/reject-leave/${id}`);
            // Update leave history after rejecting leave
            const updatedLeaveHistory = leaveHistory.map(leave => {
                if (leave._id === id) {
                    leave.status = 'Rejected';
                }
                return leave;
            });
            setLeaveHistory(updatedLeaveHistory);
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container1">
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
                            <th>Action</th>
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
                                <td>
                                    {leave.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleApproveLeave(leave._id)}>Approve</button>
                                            <button onClick={() => handleRejectLeave(leave._id)}>Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;

