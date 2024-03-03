import React, { useContext } from 'react';
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import axios from 'axios';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);

    const showAlert = (title, text, icon) => {
        Swal.fire({
            "title": title,
            "text": text,
            "icon": icon,
            "showConfirmButton": false,
            "timer": 2000
        });
    };

    const attendanceHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/log/log-attendance', { username: user.username })
            .then((response) => {
                showAlert("Successful!", "Attendance Marked", "success");
            })
            .catch((error) => {
                showAlert("Error!", error, "error");
            });
    }

    return (
        <div>
            <h1>Mark Attendance</h1>
            <button onClick={attendanceHandler}>Mark</button>
        </div>
    );
};

export default AdminDashboard;
