import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';


export default function LandingPage({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogOut() {
        logOut();
        setUser(null);
        navigate('/');
    }
    return (
        <>
        <h1>Hi Not Logged In Visitor!</h1>
        <DieImg />
        <nav className="NavBar">
      {user ? (
        <>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/">Demo</NavLink>
        </>
        //Map navlinks instead
      )}
    </nav>
    </>
    );
}