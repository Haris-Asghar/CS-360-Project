import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Employee Attendance System</h1>
            <button onClick={() => navigate('/addUser')}>Add New Users</button>
        </div>
    );
};

export default EmployeeDashboard;
