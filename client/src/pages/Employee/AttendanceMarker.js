import React, { useContext, useState } from "react";
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import { markAttendance, markAttendance2 } from '../../api';

const AttendanceMarker = () => {
    const { user } = useContext(UserContext);
    const [biometricData, setBiometricData] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

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
            if (biometricData) {
                try{
                    await markAttendance2(biometricData);
                }catch(error){
                    showAlert("Error!", error.message, "error");
                }
            }
            else{
                await markAttendance(user.username);
                showAlert("Successful!", "Attendance Marked", "success");
            }
        } catch (error) {
            showAlert("Error!", error.message, "error");
        }
    };

    const handleScanBiometricData = async () => {
      try {
        const device = await navigator.usb.requestDevice({ filters: [] });
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);
        await device.connect();
        // Code to interact with USB device and capture biometric data
        // For simplicity, let's assume biometric data is captured as a string
        setBiometricData("Captured biometric data");
        setSuccess(true);
        // Whomever is using this code need to add their own drivers to this
      } catch (error) {
        console.error("Error accessing USB device:", error);
        // Handle error
        setErrors({ ...errors, biometricData: "Device/drivers not found" });
      }
    };

    return (
        <div className='container'>
            <div className="employee__records">
                <h2>Mark Attendance</h2>
                <button className='button' onClick={attendanceHandler}>Mark</button>
                <button className="button" type="button" onClick={handleScanBiometricData}>Scan Biometric Data</button>
                {success && <p className="success-message">Biometric data captured successfully</p>}
                {errors.biometricData && <p className="error-message">{errors.biometricData}</p>}
            </div>
        </div>
    );
};

export default AttendanceMarker;
