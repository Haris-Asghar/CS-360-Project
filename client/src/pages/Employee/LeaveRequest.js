import React, { useState, useContext } from 'react';
import axios from 'axios';
import './leaveRequest.css'; // Import CSS file
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker'; // Import Datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import Datepicker CSS

const LeaveRequest = () => {
    const { user } = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [leaveReason, setLeaveReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Your leave request submission logic here
        const leaveData = {
            username: user.username,
            startDate: startDate,
            endDate: endDate,
            leaveReason: leaveReason,
            otherReason: otherReason
        };

        axios
            .post('http://localhost:3001/leave/submit-leave', leaveData)
            .then((response) => {
                setLoading(false);
                Swal.fire({
                    title: 'Leave Request Successful!',
                    text: 'Your leave request has been submitted successfully.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
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
                {leaveReason === 'other' && (
                    <div className="form-group">
                        <label htmlFor="otherReason">Other Reason:</label>
                        <input
                            type="text"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            className="form-control"
                            id="otherReason"
                            placeholder="Enter Other Reason"
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LeaveRequest;
