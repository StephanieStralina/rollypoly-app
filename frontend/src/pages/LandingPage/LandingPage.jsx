import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useEffect } from "react";
import { logOut } from '../../services/authService';
import './LandingPage.css';
import AppFooter from "../../components/AppFooter/AppFooter";
import RollyPolyLogo from '../../assets/images/RollyPolyLogo.png'


export default function LandingPage({ user, setUser, die, handleLogOut }) {
  const navigate = useNavigate();


  return (
    <div className="landing-page">
      <div className="backdrop landing-div">
        <img src={RollyPolyLogo} style={{maxHeight: '32vmin'}} alt="A picture of a green logo reading RollyPolly" />
        <DieImg die={die} alt="A picture of a large 20 sided die with the number 20 in the middle of it" />
        <h3>A Dice Rolling App</h3>
        <nav className="landing-nav poppins-light">
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
              <NavLink to="/sign-up">Sign Up</NavLink>
              &nbsp; | &nbsp;
              <NavLink to="/demo">Demo</NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}