import { NavLink, Link } from 'react-router';
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
          <NavLink to="/">Home</NavLink>
        </>
        }
        </footer> 
    ) 
}