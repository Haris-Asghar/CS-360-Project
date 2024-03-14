import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitLeaveRequest, fetchEmployeeLeaveHistory } from './Utilities/api';

const LeaveRequest = () => {
    const { user } = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [leaveReason, setLeaveReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const leaveData = {
            username: user.username,
            startDate: startDate,
            endDate: endDate,
            leaveReason: leaveReason,
            otherReason: otherReason
        };
        try {
            await submitLeaveRequest(leaveData);
            setLoading(false);
            Swal.fire({
                title: 'Leave Request Successful!',
                text: 'Your leave request has been submitted successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            // Reload the page after submission
            window.location.reload();
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="leave-request-title">Leave Request</h1>
            <form onSubmit={handleLeaveSubmit}>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        id="startDate"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        id="endDate"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="leaveReason">Leave Reason:</label>
                    <select
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="form-control"
                        id="leaveReason"
                    >
                        <option value="">Select Reason</option>
                        <option value="sick">Sick Leave</option>
                        <option value="vacation">Vacation</option>
                        <option value="personal">Personal</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="otherReason">Explaination:</label>
                    <input
                        type="text"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        className="form-control"
                        id="otherReason"
                        placeholder="Enter Explaination"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
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

export default LeaveRequest;
