import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link } from 'react-router';
import './LandingPage.css';
import RollyPolyLogo from '../../assets/images/RollyPolyLogo.png'


export default function LandingPage({ user, die }) {


  return (
    <div className="landing-page">
      <div className="backdrop landing-div">
        <img className="landing-logo" src={RollyPolyLogo} style={{maxHeight: '32vmin'}} alt="A picture of a green logo reading RollyPolly" />
        <DieImg die={die} alt="A picture of a large 20 sided die with the number 20 in the middle of it" />
        <h3 className="landing-text">A Dice Rolling App</h3>
        <nav className="landing-nav poppins-light">
          {user ? (
            <>
              <Link to="/dashboard">
                Lost?
              </Link>
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