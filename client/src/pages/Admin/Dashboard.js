import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../components/User_Context";
import PresentEmployeesTable from "../../components/Present_Employees_Table";
import MyClock from "../../components/Clock";
import { employeeInfo } from "../../api";
import { fetchPresentEmployeesAttendance } from '../../api';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const [presentEmployees, setPresentEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const data = await fetchPresentEmployeesAttendance();
                console.log(data)
                setPresentEmployees(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeInfo();
        setAttendanceData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [user.role]);


  return (
    <div>
      {/* <AdminNavbar /> */}
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <h1>Welcome to Employee Attendance System</h1>
      <div className="clock-section">
        <h2>Clock</h2>
        <MyClock />
      {/* </div>
      <PresentEmployeesTable presentEmployees={presentEmployees} />
      <div> */}
        <h3>Employee Stats</h3>
        {attendanceData && (
          <div>
            <p>Total Employees: {attendanceData.totalEmployees}</p>
            <p>Present Employees: {attendanceData.presentEmployees}</p>
            <p>Absent Employees: {attendanceData.absentEmployees}</p>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
