import React, { useState, useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitLeaveRequest } from '../../api';

const LeaveRequest = () => {
    const { user } = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [leaveReason, setLeaveReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();
        if (startDate > endDate) {
            setLoading(false);
            setError("Start Date can't be greater than End Date!");
            Swal.fire({
                title: 'Leave Request Failed!',
                text: "Start Date can't be greater than End Date!",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
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
            const timer = setTimeout(() => {
                window.location.reload();
                clearTimeout(timer);
            } , 2000);
        } catch (error) {
            setLoading(false);
            setError(error.message);
            Swal.fire({
                title: 'Leave Request Failed!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    if (loading) {
        return <div className="loader-container"><div className="loader"></div></div>;
    }

    if (error) {
        setError(error.message);
    }


    return (
        <div className="container leave__container">
            <h1 className="leave__leave-request-title">Leave Request</h1>
            <form className='auth-form' onSubmit={handleLeaveSubmit}>
                <div className="leave__form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="leave__form-control"
                        id="startDate"
                        required 
                    />
                </div>
                <div className="leave__form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="leave__form-control"
                        id="endDate"
                        required 
                    />
                </div>
                <div className="leave__form-group">
                    <label htmlFor="leaveReason">Leave Reason:</label>
                    <select
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="leave__form-control"
                        id="leaveReason"
                        required 
                    >
                        <option value="">Select Reason</option>
                        <option value="Sick">Sick Leave</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="leave_form-group leave_form-reason">
                    <label htmlFor="otherReason">Explaination:</label>
                    <textarea
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        className="leave__form-control"
                        id="otherReason"
                        placeholder="Enter Explaination"
                        required 
                    />
                </div>
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LeaveRequest;