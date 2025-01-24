import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import AppFooter from "../../components/AppFooter/AppFooter";
import './HomePage.css'


export default function HomePage({ user, setUser }) {

    return(
        <div className="home-div">
            <h1>Home Page</h1>
            <DieImg />
        <AppFooter user={user} setUser={setUser} className="footer" />
        </div>
    );
}