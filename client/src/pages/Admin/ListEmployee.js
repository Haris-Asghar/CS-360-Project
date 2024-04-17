import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { getAllEmployees } from "../../api";
import Swal from 'sweetalert2';

const showAlert = (username, firstname, lastname, numofattendances, numofabsences) => {
    Swal.fire({
        title: 'More Info',
        html: `Username: ${username} <br> First Name: ${firstname} <br> Last Name: ${lastname} <br> No. of Attendance: ${numofattendances} <br> No. of Absences: ${numofabsences}`,
        icon: 'info',
        showConfirmButton: false,
        timer: 10000
    });
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
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
    const jsonData = employees;

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
    link.setAttribute("download", `${getCurrentMonthName()}_attendance.csv`);
    document.body.appendChild(link);
    link.click();
};

  return (
    <>
      {!loading && !error && employees && (
        <div className="container">
          <div className="employee__records">
            <h2>List of All Employees</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th className='mobile'>First Name</th>
                  <th className='mobile'>Last Name</th>
                  <th>No. of Attendance</th>
                  <th>No. of Absences</th>
                  <th className='desktop'>Info&#43;</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.username}>
                    <td
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      <Link
                        to={`/employee/forAdmin/${employee.username}`}
                        style={{ color: "#000" }}
                      >
                        <span
                          style={{
                            textDecoration: "none",
                            transition: "text-decoration 0.3s ease",
                          }}
                        >
                          {employee.username}
                        </span>
                      </Link>
                    </td>

                    <td className='mobile'>{employee.firstname}</td>
                    <td className='mobile'>{employee.lastname}</td>
                    <td>{employee.numofattendances}</td>
                    <td>{employee.numofabsences}</td>
                    <td className='info__icon desktop'><btn onClick={() => showAlert(employee.username, employee.firstname, employee.lastname, employee.numofattendances, employee.numofabsences)}>&#9432;</btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className='button button__margin' onClick={convertJsonToCsv}>Download CSV</button>
        </div>
      )}

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {error && <div className="error">Error: {error}</div>}
    </>
  );
};

export default EmployeeList;
