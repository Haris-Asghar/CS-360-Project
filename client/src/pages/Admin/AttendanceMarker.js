import React, { useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import { markAttendance } from '../Employee/Utilities/api';

const AttendanceMarker = () => {
    const { user } = useContext(UserContext);

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const attendanceHandler = async (e) => {
        e.preventDefault();
        const today = new Date();
        if (today.getDay() === 6 || today.getDay() === 0) {
            showAlert("Error!", "Attendance cannot be marked on Saturdays and Sundays!", "error");
            return;
        }
        try {
            await markAttendance(user.username);
            showAlert("Successful!", "Attendance Marked", "success");
        } catch (error) {
            showAlert("Error!", error.message, "error");
        }
    };

    return (
        <div className='container'>
            <div className="action-item">
                <h2>Mark Attendance</h2>
                <button onClick={attendanceHandler}>Mark</button>
            </div>
        </div>
    );
};

export default AttendanceMarker;
