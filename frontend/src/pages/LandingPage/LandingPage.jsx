import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useEffect } from "react";
import { logOut } from '../../services/authService';
import './LandingPage.css';
import AppFooter from "../../components/AppFooter/AppFooter";


export default function LandingPage({ user, setUser, die, handleLogOut }) {
    const navigate = useNavigate();


    return (
        <div className="landing-page">
        <div className="backdrop">
        <h1>RollyPo.ly</h1>
        <DieImg die={die}/>
        <h3>A Dice Rolling App</h3>
        <nav className="landing-nav">
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
    <AppFooter className="footer"/>
    </div>
    </div>
    );
}