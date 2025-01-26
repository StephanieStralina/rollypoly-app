import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './AppFooter.css'

export default function AppFooter({user, setuser, handleLogOut}) {
    
    return (

        <footer className='footer'>
            {user ? (
        <>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
        </>
        )
        :
                <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/">Demo</NavLink>
        </>
        }
        </footer> 
    ) 
}