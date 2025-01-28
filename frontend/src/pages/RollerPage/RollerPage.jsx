import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useState } from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import './RollerPage.css'
import DiceForm from "../../components/DiceForm/DiceForm";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import addImg from '../../assets/images/addImg.png';
import HamburgerNav from "../../components/HamburgerNav/HamburgerNav";


export default function RollerPage({ user, setUser, handleLogOut, die }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [resultMessage, setResultMessage] = useState("Click the dice to roll!");
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: die || 20,
        modifier: 0,
    });
    const [demoHistory, setDemoHistory] = useState([]);

    function setDemoRoll(numDice, diceSides, modifier) {
        setResultMessage("Now try clicking the dice to roll them!");
        setRollForm({
            numDice,
            diceSides,
            modifier,
        });
    }

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
            if (!user) {
                const completeRoll = {
                    result: finalResult,
                    numDice: rollForm.numDice,
                    diceSides: rollForm.diceSides,
                    modifier: rollForm.modifier,
                }
                if (demoHistory.length >= 10){
                    setDemoHistory([...demoHistory.slice(1), completeRoll]);
                } else {
                    setDemoHistory([...demoHistory, completeRoll]);
                }
            }
        }, 500);
    }

    //TODO onClick addFormula btn
    //TODO add screen sizing so that HamburgerMenu only displays on mobile

    return (
        <div className="roller-page">
            <HamburgerNav demoHistory={demoHistory} />
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
                        <DiceFormula setDemoRoll={setDemoRoll} />
                    </>
                )}
            {user ?
                (
                    <div className="add-formula-btn">
                    <img src={addImg} style={{maxWidth:'10vmin', maxHeight:'10vmin'}}></img>
                    <span>Click to add formula</span>
                    </div>
                ) : (
                    <>
                    <img src={addImg} style={{maxWidth:'10vmin', maxHeight:'10vmin', margin: '4vmin'}}></img>
                    <span><NavLink to="/sign-up">Sign up</NavLink> or <NavLink to="/login">Log In</NavLink> to add your own formulas!</span>
                    </>
                )
            }

            <AppFooter user={user} setUser={setUser} handleLogOut={handleLogOut} className="footer" />
        </div>
    );
}