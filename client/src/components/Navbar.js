import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './User_Context';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const role = user.role;

    const signOutHandler = () => {
        setUser({ "username": "", "role": "" });
        sessionStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="navbar">
            <h1>Employee Management System</h1>
            <div className="nav-links">
                {role === "Admin" ? (
                    <>
                        <Link to="/admin/home">Home</Link>
                        <Link to="/admin/addUser">Add User</Link>
                        <Link to='/admin/leaveOfAll'>View Leave History All Employees</Link>
                    </>
                ) : (
                    <>
                        <Link to="/employee/home">Home</Link>
                    </>
                )}
                <Link to="/" onClick={signOutHandler}>Sign Out</Link>
            </div>
        </div>
    );
};

const NavbarWrapper = ({ children }) => {
    const isHomeRoute = window.location.pathname === "/";
    return isHomeRoute ? null :
        (
            <>
                <Navbar />
                {children}
            </>
        );
};

export default NavbarWrapper;