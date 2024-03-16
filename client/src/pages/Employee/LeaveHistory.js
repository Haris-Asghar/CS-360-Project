import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchEmployeeLeaveHistory } from './Utilities/api';

const LeaveHistory = () => {
    const { user } = useContext(UserContext);
    const [employeeLeaveHistory, setEmployeeLeaveHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEmployeeLeaveHistory(user.username);
                setEmployeeLeaveHistory(data);
            } catch (error) {
                console.error('Error fetching employee leave history:', error);
            }
        };

        fetchData();
    }, [user.username]);

    return (
        <div className="container">
            <div className="user-leave-history">
                <h2>Your Leave History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Reason</th>
                            <th>Explaination</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeLeaveHistory.map((leave, index) => (
                            <tr key={index}>
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
