import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = () => {
    const [_, setCookie] = useCookies(['employee_token']);

    const signOutHandler = () => {
        localStorage.removeItem('employeeID');
        setCookie('employee_token', '');
        window.location.href = '/';
    };

    return (
        <div className="navbar">
            <h1>Employee Management System</h1>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/addUser">Add User</Link>
                <Link to="/" onClick={signOutHandler}>Sign Out</Link>
            </div>
        </div>
    );
};

const NavbarWrapper = ({ children }) => {
    const isHomeRoute = window.location.pathname === "/";
    return isHomeRoute ? null :
        <>
            <Navbar />
            {children}
        </>;
};

export default NavbarWrapper;