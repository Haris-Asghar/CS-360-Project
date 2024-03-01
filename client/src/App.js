import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Admin/Home';
import EmployeeDashboard from './pages/Admin/Home';
import Auth from './pages/Auth';
import AddUser from './pages/Admin/AddUser';
import NavbarWrapper from './components/Navbar';
import AuthRoute from './components/Auth_Route';

function App() {
  const role = "employee";
  const role1 = "admin"
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute route={"/"}><Auth /></AuthRoute>} />
          {role1 && role1 === "admin" && (<>
            <Route path="/home" element={<AuthRoute><NavbarWrapper><AdminDashboard /></NavbarWrapper></AuthRoute>} />
            <Route path="/addUser" element={<AuthRoute><NavbarWrapper><AddUser /></NavbarWrapper></AuthRoute>} />
          </>
          )}
          {role && role === "employee" && (
            <Route path="/home" element={<AuthRoute><NavbarWrapper><EmployeeDashboard /></NavbarWrapper></AuthRoute>} />
          )}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

