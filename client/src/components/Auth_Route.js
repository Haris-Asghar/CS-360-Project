import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "./User_Context";

const Auth_Route = ({ children, actual_role }) => {
    const { user, setUser } = useContext(UserContext);
    const role = user.role;
    const username = user.username;

    const signOutHandler = () => {
        setUser({ "username": "", "role": "" });
        sessionStorage.clear();
        window.location.href = '/';
    };

    if (!username) {
        if (window.location.pathname !== "/") {
            return <>
                You are not logged in. Please log in to view this page.
                <p>Username: {user.username}</p>
                <p>Role: {user.role}</p>
                <button><Link to="/">Login</Link></button>
            </>;
        }
        return children;
    }
    else {
        if (username) {
            if (window.location.pathname !== "/") {
                if (actual_role !== role) {
                    return <>
                        You are not authorized to view this page.
                        <p>Username: {user.username}</p>
                        <p>Role: {user.role}</p>
                        <button><Link to="/">Login</Link></button></>;
                }
                return children;
            }
            return <>
                You are logged in. Please sign out first
                <p>Username: {user.username}</p>
                <p>Role: {user.role}</p>
                <button><Link to="/" onClick={signOutHandler}>Sign Out</Link></button>
            </>
        }
    }
};

export default Auth_Route;
