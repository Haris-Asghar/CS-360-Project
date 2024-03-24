import React from 'react';
import useLeaveRequests from './Utilities/useLeaveRequests';
import './adminDashboard.css'; // Import CSS file

const AdminDashboard = () => {
    const { leaveHistory, loading, error, handleApproveLeave, handleRejectLeave } = useLeaveRequests();

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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Explanation</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map((leave, index) => (
                            <tr key={index} className={leave.status.toLowerCase()}>
                                <td>{leave.firstName}</td>
                                <td>{leave.lastName}</td>
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
