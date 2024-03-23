// PresentEmployeesTable.js

import React from 'react';

const PresentEmployeesTable = ({ presentEmployees }) => {
    return (
        <div className="present-employees-table">
            <h2>Present Employees Today</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Attendance Time</th>
                    </tr>
                </thead>
                <tbody>
                    {presentEmployees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.attendanceTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PresentEmployeesTable;
