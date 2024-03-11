import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import AddUser from './pages/Admin/AddUser';
import AdminDashboard from './pages/Admin/Dashboard';
import EmployeeDashboard from './pages/Employee/Dashboard'
import NavbarWrapper from './components/Navbar';
import AuthRoute from './components/Auth_Route';
import LeaveRequest from './pages/Employee/LeaveRequest';
import LeaveofAllEmployees from './pages/Admin/LeaveOfAll';
import AttendanceRecords from './pages/Employee/AttendanceRecords';
import AttendanceMarker from './pages/Employee/AttendanceMarker';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthRoute><Auth /></AuthRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/home" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/addUser" element={<ProtectedRoute role="Admin"><AddUser /></ProtectedRoute>} />
          <Route path="/admin/leaveOfAll" element={<ProtectedRoute role="Admin"><LeaveofAllEmployees/></ProtectedRoute>} />

          {/* Employee Routes */}
          <Route path="/employee/home" element={<ProtectedRoute role="Employee"><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="/employee/applyLeave" element={<ProtectedRoute role="Employee"><LeaveRequest /></ProtectedRoute>} />
          <Route path="/employee/attendance-records" element={<ProtectedRoute role="Employee"><AttendanceRecords /></ProtectedRoute>} />
          <Route path="/employee/mark-attendance" element={<ProtectedRoute role="Employee"><AttendanceMarker /></ProtectedRoute>} />
          
          {/* Page Not Found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

const ProtectedRoute = ({ role, children }) => {
  return (
    <AuthRoute actual_role={role}>
      <NavbarWrapper>{children}</NavbarWrapper>
    </AuthRoute>
  );
};

export default App;