import React, { useState, useEffect } from 'react';
import { fetchLeaveHistory, handleApproveLeave, handleRejectLeave } from '../../api';
import Swal from 'sweetalert2';

const showAlert = (username, firstName, lastName, startDate, endDate, leaveReason, otherReason, status) => {
    Swal.fire({
        title: 'More Info',
        html: `Username: ${username} <br> First Name: ${firstName} <br> Last Name: ${lastName} <br> Start Date: ${new Date(startDate).toLocaleDateString()} <br> End Date: ${new Date(endDate).toLocaleDateString()} <br> Leave Reason: ${leaveReason} <br> Explanation: ${otherReason} <br> Status: ${status}`,
        icon: 'info',
        showConfirmButton: false,
        timer: 10000
    });
};

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

    const getCurrentMonthName = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentDate = new Date();
        const currentMonth = months[currentDate.getMonth()];
        return currentMonth;
      };
    
      const convertJsonToCsv = () => {
        const jsonData = leaveHistory;
    
        // Extract headers from the first object in jsonData, excluding certain keys
        const headers = Object.keys(jsonData[0]).filter(key => key !== '_id' && key !== '__v');
    
        // Construct CSV content with headers
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n";
    
        // Add data rows, excluding certain keys
        csvContent += jsonData.map(row => {
            return headers.map(header => row[header]).join(',');
        }).join('\n');
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${getCurrentMonthName()}_leave.csv`);
        document.body.appendChild(link);
        link.click();
    };
    

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
                            <th className='mobile'>First Name</th>
                            <th className='mobile'>Last Name</th>
                            <th className='mobile'>Start Date</th>
                            <th className='mobile'>End Date</th>
                            <th className='mobile'>Leave Reason</th>
                            <th className='mobile'>Explanation</th>
                            <th className='mobile'>Status</th>
                            <th>Action</th>
                            <th className='desktop'>Info&#43;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && leaveHistory && leaveHistory.map((leave, index) => (
                            <tr key={index} className={leave.status}>
                                <td>{leave.username}</td>
                                <td className='mobile'>{leave.firstName}</td>
                                <td className='mobile'>{leave.lastName}</td>
                                <td className='mobile'>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className='mobile'>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className='mobile'>{leave.leaveReason}</td>
                                <td className='mobile'>{leave.otherReason}</td>
                                <td className='mobile'>{leave.status}</td>
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
                                <td className='info__icon desktop'><btn onClick={() => showAlert(leave.username, leave.firstName, leave.lastName, leave.startDate, leave.endDate, leave.leaveReason, leave.otherReason, leave.status)}>&#9432;</btn></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className='button button__margin' onClick={convertJsonToCsv}>Download CSV</button>
        </div>
    );
}

export default LeaveofAll;