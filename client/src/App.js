import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddUser from './pages/AddUser';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<NavbarWrapper><Home /></NavbarWrapper>} />
          <Route path="/addUser" element={<NavbarWrapper><AddUser /></NavbarWrapper>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

const NavbarWrapper = ({ children }) => {
  const isHomeRoute = window.location.pathname === "/";
  return isHomeRoute ? null : 
  <>
    <Navbar />
    {children}
  </>;
};

export default App;
