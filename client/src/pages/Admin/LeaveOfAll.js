import React, { useState, useEffect } from 'react';
import { fetchLeaveHistory, handleApproveLeave, handleRejectLeave } from '../../api';

const LeaveofAll = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLeaveHistory();
                setLeaveHistory(response);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApprove = async (id) => {
        try {
            await handleApproveLeave(id);
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

    const handleReject = async (id) => {
        try {
            await handleRejectLeave(id);
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
        return <div className="loader-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <div className="employee__records">
                <h2>Leave History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Explanation</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && leaveHistory && leaveHistory.map((leave, index) => (
                            <tr key={index} className={leave.status}>
                                <td>{leave.username}</td>
                                <td>{leave.firstName}</td>
                                <td>{leave.lastName}</td>
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td>{leave.leaveReason}</td>
                                <td>{leave.otherReason}</td>
                                <td>{leave.status}</td>
                                <td>
                                    {leave.status === 'Pending' ? (
                                        <>
                                            <button className='enabled enabled__success' onClick={() => handleApprove(leave._id)}>Approve</button>
                                            <button className='enabled enabled__reject' onClick={() => handleReject(leave._id)}>Reject</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='disabled' disabled>Approve</button>
                                            <button className='disabled' disabled>Reject</button>
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
}

export default LeaveofAll;