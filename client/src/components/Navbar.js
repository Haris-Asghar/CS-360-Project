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
                        <Link to="/admin/home">
                            <i className="fas fa-home"></i> Home
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/employee/home">
                            <i className="fas fa-home"></i> Home
                        </Link>
                    </>
                )}
                <Link to="/" onClick={signOutHandler}>
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                </Link>
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