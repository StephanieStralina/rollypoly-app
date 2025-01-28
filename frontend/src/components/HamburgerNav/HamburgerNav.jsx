import { Link } from "react-router"
import { useState } from "react"
import './HamburgerNav.css'
import hamburgerImg from '../../assets/images/hamburgerImg.png'
import closeImg from '../../assets/images/closeImg.png'

export default function HamburgerNav() {
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
                    <li>Settings</li>
                    <li>Formulas</li>
                    <div>History</div>
                    </ul>
                )}
        </nav>
    )
}