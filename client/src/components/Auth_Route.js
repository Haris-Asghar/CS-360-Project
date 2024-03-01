import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


const Auth_Route = ({ children }) => {
    const [cookies, setCookie] = useCookies(['employee_token']);
    const token = window.localStorage.getItem('employeeID');

    const signOutHandler = () => {
        localStorage.removeItem('employeeID');
        setCookie('employee_token', '');
        window.location.href = '/';
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
                return children;
            }
            return <>You are logged in. Please sign out first
                <button><Link to="/" onClick={signOutHandler}>Sign Out</Link></button>
            </>
        }
    }
};

export default Auth_Route;
