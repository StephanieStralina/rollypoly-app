import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useState } from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import './RollerPage.css'
import DiceForm from "../../components/DiceForm/DiceForm";


export default function RollerPage({ user, setUser, handleLogOut, die }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [resultMessage, setResultMessage] = useState("Click the dice to roll!");
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: die || 20,
        modifier: 0,
    });

    function handleChange(evt) {
        setRollForm({ ...rollForm, [evt.target.name]: evt.target.value });
    }

    function rollDice() {
        const interval = setInterval(() => {
            setRolledNumber(Math.floor(Math.random() * rollForm.diceSides) + 1);
        }, 35);

        setTimeout(() => {
            clearInterval(interval);
            //Final Roll Math
            const results = [];
            for (let i = 0; i < rollForm.numDice; i++) {
                results.push(Math.floor(Math.random() * rollForm.diceSides) + 1);
            }
            const modifier = parseInt(rollForm.modifier, 10);
            const totalRoll = results.reduce((sum, roll) => sum + roll, 0);
            const finalResult = totalRoll + modifier;
            setRolledNumber(finalResult);
            setResultMessage(
                `You rolled a ${finalResult}! (${results.join(
                    " + "
                )} on your ${rollForm.numDice}d${rollForm.diceSides}
             + ${modifier} modifier)`
            );
        }, 500);
    }


    return (
        <div className="roller-page">
            <h1>Home Page</h1>
            <div>Dice Clicking Images Here</div>
            <DieImg rollDice={rollDice} rolledNumber={rolledNumber} die={die} />
            <div>{resultMessage}</div>
            <DiceForm rollForm={rollForm} handleChange={handleChange} />
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

            <AppFooter user={user} setUser={setUser} handleLogOut={handleLogOut} className="footer" />
        </div>
    );
}