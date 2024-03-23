// useLeaveRequests.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useLeaveRequests = () => {
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

    return { leaveHistory, loading, error, handleApproveLeave, handleRejectLeave };
};

export default useLeaveRequests;
