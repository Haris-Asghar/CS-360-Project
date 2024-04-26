import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../../components/User_Context';
import Swal from 'sweetalert2';
import { markAttendance, markAttendance2 } from '../../api';
import faceIO from '@faceio/fiojs'

const AttendanceMarker = () => {
    const { user } = useContext(UserContext);
    const [biometricData, setBiometricData] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [faceid, setFaceId] = useState(null);
    const [accountExistString, setAccountExistString] = useState("");
    const [facevalidation, setFaceValidation]=useState(false);

    let faceio;

    useEffect(() => {
        faceio = new faceIO("fioac816");
    }, []);

    const handleNewFaceUser = async () => {
        try {
            let response = await faceio.enroll({
                locale: "auto"
            });
            setFaceId(response.facialId);
        } catch (error) {
            console.log("error", error);
            if (error === 20) {
                setAccountExistString("Your account exists, Please Sign In");
            }
            if (error === 9 || error === 6) {
                setAccountExistString("Something went wrong! Please try again!");
            }
            if (error === 13) {
                window.location.reload();
            }
        }
    };

    const handleAuthenticationFaceUser = async () => {
        try {
            let response = await faceio.authenticate({
                locale: "auto"
            });
            setFaceId(response.facialId);
            setFaceValidation(true)
        } catch (error) {
            if (error === 20) {
                window.location.reload();
            }
        }
    };

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
                try {
                    await markAttendance2(biometricData);
                } catch (error) {
                    showAlert("Error!", error.message, "error");
                }
            } else {
                await markAttendance(user.username);
                showAlert("Successful!", "Attendance Marked", "success");
            }
        } catch (error) {
            showAlert("Error!", error.message, "error");
        }
    };

    const handleScanBiometricData = async () => {
        // Call function to scan biometric data here
        // Depending on the scenario, either call handleNewFaceUser() or handleAuthenticationFaceUser()
    };

    return (
        <div className='container'>
            <div className="employee__records">
                <h2>Mark Attendance</h2>
                <div className="marker__buttons">
                    {facevalidation && <button className='button' onClick={attendanceHandler}>Mark</button>}
                    <button className='button' onClick={handleAuthenticationFaceUser}>Authenticate Face User</button>
                </div>
                {success && <p className="success-message">Biometric data captured successfully</p>}
                {errors.biometricData && <p className="error-message">{errors.biometricData}</p>}
                {accountExistString && <p className="error-message">{accountExistString}</p>}
            </div>
        </div>
    );
    
};

export default AttendanceMarker;
