import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';

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
            await axios.post('http://localhost:3001/log/log-attendance', { username: user.username });
            showAlert("Successful!", "Attendance Marked", "success");
        } catch (error) {
            showAlert("Error!", "Attendance already marked for the day!!", "error");
        }
    };

    return (
        <div className="action-item">
            <h2>Mark Attendance</h2>
            <button onClick={attendanceHandler}>Mark</button>
        </div>
    );
};

export default AttendanceMarker;
