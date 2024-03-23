import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchEmployeeLeaveHistory } from './Utilities/api';

const LeaveHistory = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employeeLeaveHistory, setEmployeeLeaveHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployeeLeaveHistory(user.username);
                setEmployeeLeaveHistory(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [user.username]);

    if (loading) {
        return <div className="loader-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!employeeLeaveHistory || employeeLeaveHistory.length === 0) {
        return <div className="error">No leave history available</div>;
    }

    return (
        <div className="container">
            <div className="employee__records">
                <h2>Your Leave History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Explanation</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeLeaveHistory.map((leave, index) => (
                            <tr className={leave.status} key={index}>
                                <td>{leave.firstName}</td>
                                <td>{leave.lastName}</td>
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td>{leave.leaveReason}</td>
                                <td>{leave.otherReason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveHistory;
