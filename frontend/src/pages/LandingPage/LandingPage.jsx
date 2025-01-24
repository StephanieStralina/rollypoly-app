import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './LandingPage.css';


export default function LandingPage({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogOut() {
        logOut();
        setUser(null);
        navigate('/');
    }
    return (
        <>
        <h1>RollyPo.ly</h1>
        {user ? <h3>Hi Logged In Visitor!</h3> : <h3>Hi Not Logged In Visitor!</h3>}
        <DieImg />
        <h3>A Dice Rolling App</h3>
        <nav className="LandingNav">
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
          <NavLink to="/demo">Demo</NavLink>
        </>
      )}
    </nav>
    </>
    );
}