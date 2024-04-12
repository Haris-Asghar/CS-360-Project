import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/User_Context';
import { fetchEmployeeLeaveHistory } from '../../api';
import Swal from 'sweetalert2';

const showAlert = (sdate, edate, reason, explanation) => {
    Swal.fire({
        title: 'More Info',
        html: `Start Date: ${new Date(sdate).toLocaleDateString()} <br> End Date: ${new Date(edate).toLocaleDateString()} <br> Leave Reason: ${reason} <br> Explanation: ${explanation}`,
        icon: 'info',
        showConfirmButton: false,
        timer: 10000
    });
};

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
                <div className='employee__records__table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th className='mobile'>Leave Reason</th>
                                <th className='mobile'>Explanation</th>
                                <th>Status</th>
                                <th className='desktop'>Info&#43;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeLeaveHistory.map((leave, index) => (
                                <tr className={leave.status} key={index}>
                                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className='mobile'>{leave.leaveReason}</td>
                                    <td className='mobile'>{leave.otherReason}</td>
                                    <td>{leave.status}</td>
                                    <td className='info__icon desktop'><btn onClick={() => showAlert(leave.startDate, leave.endDate, leave.leaveReason, leave.otherReason)}>&#9432;</btn></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveHistory;
