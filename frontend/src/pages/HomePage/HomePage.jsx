import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import AppFooter from "../../components/AppFooter/AppFooter";
import './HomePage.css'


export default function HomePage({ user, setUser, handleLogOut }) {

    return(
        <div className="home-page">
            <h1>Home Page</h1>
            <div>Dice Clicking Images Here</div>
            <DieImg />
            <div>If idle, "click dice to roll"</div>
            <div>Dice Form Here</div>
            {user ? 
            (
                <>
                <span>User formulas here</span>
                </>
            ) : (
                <>
                <span>Guest Test Formula here</span>
                </>
            )}
            
        <AppFooter user={user} setUser={setUser} handleLogOut={handleLogOut} className="footer"/>
        </div>
    );
}