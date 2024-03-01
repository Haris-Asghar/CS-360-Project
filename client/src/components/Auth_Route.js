import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { ultraSignOutHandler } from '../pages/Auth';

const Auth_Route = ({ children, actual_role }) => {
    const [cookies, setCookie] = useCookies(['employee_token']);
    const token = window.localStorage.getItem('employeeID');
    const role = window.localStorage.getItem('employeeRole');

    const signOutHandler = () => {
        ultraSignOutHandler();
        setCookie('employee_token', '');
    };

    if (!cookies.employee_token && !token) {
        if (window.location.pathname !== "/") {
            return <>
                You are not logged in. Please log in to view this page.
                <button><Link to="/">Login</Link></button>
            </>;
        }
        return children;
    }
    else {
        if (cookies.employee_token || token) {
            if (window.location.pathname !== "/") {
                if (actual_role !== role) {
                    return <>You are not authorized to view this page. <button><Link to="/">Login</Link></button></>;
                }
                return children;
            }
            return <>You are logged in. Please sign out first
                <button><Link to="/" onClick={signOutHandler}>Sign Out</Link></button>
            </>
        }
    }
};

export default Auth_Route;
