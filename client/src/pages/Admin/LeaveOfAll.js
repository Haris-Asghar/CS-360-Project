import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get('https://cs-360-project.vercel.app/leave/leave-requests');
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
            await axios.put(`https://cs-360-project.vercel.app/leave/approve-leave/${id}`);
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
            await axios.put(`https://cs-360-project.vercel.app/leave/reject-leave/${id}`);
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
            <h1 className="dashboard-title">Leave History</h1>
            <div className="leave-history">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Explaination</th>
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
                                <td>{leave.otherReason}</td>
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