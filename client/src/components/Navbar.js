import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Employee Management System</h1>
            <div className="nav-links">
                <a href="/home">Home</a>
                <a href="/addUser">Add User</a>
            </div>
        </div>
    );
};

export default Navbar;
