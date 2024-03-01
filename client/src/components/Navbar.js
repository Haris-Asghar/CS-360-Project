import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ultraSignOutHandler } from '../pages/Auth';

const Navbar = () => {
    const [_, setCookie] = useCookies(['employee_token']);
    const role = window.localStorage.getItem('employeeRole');

    const signOutHandler = () => {
        ultraSignOutHandler();
        setCookie('employee_token', '');
    };

    return (
        <div className="navbar">
            <h1>Employee Management System</h1>
            <div className="nav-links">
                {role === "Admin" ? (
                    <>
                        <Link to="/admin/home">Home</Link>
                        <Link to="/admin/addUser">Add User</Link>
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