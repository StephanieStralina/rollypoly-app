import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useState } from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import './RollerPage.css'


export default function RollerPage({ user, setUser, handleLogOut, die }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [resultMessage, setResultMessage] = useState("Click the dice to roll!");

    function rollDice() {
        const interval = setInterval(() => {
        setRolledNumber(Math.floor(Math.random() * die) + 1);
        }, 35);
    
        setTimeout(() => {
          clearInterval(interval); 
          const finalNumber = Math.floor(Math.random() * die) + 1
          setRolledNumber(finalNumber);
          setResultMessage(`You rolled a ${finalNumber}!`);
        }, 500);
      }

    return(
        <div className="roller-page">
            <h1>Home Page</h1>
            <div>Dice Clicking Images Here</div>
            <DieImg rollDice={rollDice} rolledNumber={rolledNumber} die={die} />
            <div>{resultMessage}</div>
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