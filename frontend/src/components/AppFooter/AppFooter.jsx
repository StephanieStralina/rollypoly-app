import { NavLink, Link } from 'react-router';
import './AppFooter.css'

export default function AppFooter({user, setUser, handleLogOut}) {
    
    return (

        <footer className='footer'>
            {user ? (
        <>
          <NavLink to="/dashboard">
            Home
          </NavLink>
          &nbsp; | &nbsp;
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
          <NavLink to="/sign-up">Sign Up</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/">Home</NavLink>
        </>
        }
        </footer> 
    ) 
}