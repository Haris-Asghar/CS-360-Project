import React, { useState, useEffect } from 'react';
import '../../App.css'
import { getAllEmployees } from '../../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching all employees:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="employeeTableContainer">
    <h1>List of All Employees</h1>
    <table class="employee-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Number of Attendances</th>
          <th>Number of Absences</th>
        </tr>
      </thead>
      <tbody>
          {employees.map(employee => (
            <tr key={employee.username}>
              <td>{employee.username}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.numofattendances}</td>
              <td>{employee.numofabsences}</td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  
  );
};

export default EmployeeList;
