import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import '../../App.css';
import { getAllEmployees } from '../../api';

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


  return (
    <>
      {!loading && !error && employees && (
        <div className="container">
          <div className='employee__records'>
            <h2>List of All Employees</h2>
            <table>
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
                    <td>
                      {/* Link to redirect onClick */}
                      <Link to={`/employee/forAdmin/${employee.username}`}>
                        {employee.username}
                      </Link>
                    </td>
                    <td>{employee.firstname}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.numofattendances}</td>
                    <td>{employee.numofabsences}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading && <div className="loader-container"><div className="loader"></div></div>}
      {error && <div className="error">Error: {error}</div>}
    </>
  );
};

export default EmployeeList;
