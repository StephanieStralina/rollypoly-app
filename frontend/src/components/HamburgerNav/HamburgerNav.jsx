import { Link, NavLink } from "react-router"
import { useState } from "react"
import './HamburgerNav.css'
import hamburgerImg from '../../assets/images/hamburgerImg.png'
import closeImg from '../../assets/images/closeImg.png'

export default function HamburgerNav({ demoHistory, user, userHistory, handleLogOut }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="hamburger-nav">
            {!isOpen ? (
                <img src={hamburgerImg} onClick={toggleMenu} aria-label="Toggle Menu"/>
                ) : (
                <img src={closeImg} onClick={toggleMenu} aria-label="Toggle Menu"/>
                )
            }
            {isOpen && (
                
                    <ul className="dropdown-menu">
                    {user ? (
                        <>
                    <li><NavLink to="/dashboard">Home</NavLink></li>
                    <li><NavLink to='/settings'>Settings</NavLink></li>
                    <li><NavLink to='/formulas'>Formulas</NavLink></li>
                    <li><Link to="" onClick={handleLogOut}>Log Out</Link></li>
                    <div className="history-list">
                        <h3>{user.name} History</h3>
                        {[...userHistory].reverse().map((roll, index) => (
                            <li key={index}>
                                {`Result: ${roll.result} - Dice: ${roll.numDice}d${roll.diceSides} - Mod: ${roll.modifier}`}
                            </li>
                        ))}
                    </div>
                        </>
                    ):(
                        <>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/demo">Demo</NavLink></li>
                        <li><NavLink to="/login">Log In</NavLink></li>
                        <li><NavLink to="/sign-up">Sign Up</NavLink></li>
                    <div className="history-list">
                        <h3>Guest History</h3>
                        {[...demoHistory].reverse().map((roll, index) => (
                            <li key={index}>
                                {`Result: ${roll.result} - Dice: ${roll.numDice}d${roll.diceSides} - Mod: ${roll.modifier}`}
                            </li>
                        ))}
                    </div>
                    </>
                    )
                    }

                    
                    </ul>
                )}
        </nav>
    )
}


