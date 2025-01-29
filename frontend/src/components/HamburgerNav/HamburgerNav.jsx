import { Link } from "react-router"
import { useState } from "react"
import './HamburgerNav.css'
import hamburgerImg from '../../assets/images/hamburgerImg.png'
import closeImg from '../../assets/images/closeImg.png'

export default function HamburgerNav({ demoHistory, user }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="hamburger-nav">
            {!isOpen ? (
                <img src={hamburgerImg} style={{maxHeight: '4vmin', maxWidth: '4vmin'}} onClick={toggleMenu} aria-label="Toggle Menu"/>
                ) : (
                <img src={closeImg} style={{maxHeight: '4vmin', maxWidth: '4vmin'}} onClick={toggleMenu} aria-label="Toggle Menu"/>
                )
            }
            {isOpen && (
                    <ul className="dropdown-menu">
                    {user ? (
                        <>
                    <li>Settings</li>
                    <li>Formulas</li>
                    <div>
                        <h3>User History</h3>
                    </div>
                        </>
                    ):(
                    <div>
                        <h3>Guest History</h3>
                        {demoHistory.map((roll, index) => (
                            <li key={index}>
                                {`Result: ${roll.result} - Dice: ${roll.numDice}d${roll.diceSides} - Mod: ${roll.modifier}`}
                            </li>
                        ))}
                    </div>
                    )
                    }

                    
                    </ul>
                )}
        </nav>
    )
}