//RollerPage.jsx
import DieImg from "../../components/DieImg/DieImg";
import { NavLink, Link, useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import * as rollService from '../../services/rollService';
import * as formulaService from '../../services/formulaService';
import './RollerPage.css'
import AppFooter from "../../components/AppFooter/AppFooter";
import DiceForm from "../../components/DiceForm/DiceForm";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import HamburgerNav from "../../components/HamburgerNav/HamburgerNav";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import addImg from '../../assets/images/addImg.png';


export default function RollerPage({ user, setUser, handleLogOut, die, formulas, addFormula, toggleModal, modalIsOpen, setUserRoll }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [resultMessage, setResultMessage] = useState("Click the dice to roll!");
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: die || 20,
        modifier: 0,
        source: 'manual',
        formula: null,
    });
    const [demoHistory, setDemoHistory] = useState([]);
    const [userHistory, setUserHistory] = useState(null);

    //Use effect to populate formulas for user

    function setDemoRoll(numDice, diceSides, modifier, source) {
        setResultMessage("Now try clicking the dice to roll them!");
        setRollForm({
            numDice,
            diceSides,
            modifier,
            source,
            formula: null,
        });
    }

    function setUserRoll(formula) {
        setRollForm({
            name: formula.name,
            numDice: formula.numDice,
            diceSides: formula.diceSides,
            modifier: formula.modifier,
            source: 'formula',
            formula: formula._id,
        });
    }

    function handleChange(evt) {
        setRollForm({
            ...rollForm,
            [evt.target.name]: evt.target.value,
            source: 'manual',
            formula: null,
        });
    }


    async function rollDice() {
        const interval = setInterval(() => {
            setRolledNumber(Math.floor(Math.random() * rollForm.diceSides) + 1);
        }, 35);

        setTimeout(async () => {
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
                    source: rollForm.source,
                }
                if (demoHistory.length >= 10) {
                    setDemoHistory([...demoHistory.slice(1), completeRoll]);
                } else {
                    setDemoHistory([...demoHistory, completeRoll]);
                }
            } else {
                //user logic here
                const completeUserRoll = {
                    result: finalResult,
                    numDice: rollForm.numDice,
                    diceSides: rollForm.diceSides,
                    modifier: rollForm.modifier,
                    source: rollForm.source,
                    formula: rollForm.formula,
                    userId: user._id,
                };

                let input = await rollService.findRoller(user._id);
                console.log("Find Roller Response:", input);

                if (!input) {
                    console.log('No roller found');
                    input = await rollService.initializeRoller(completeUserRoll);
                    console.log('Roller created:', input);
                } else {
                    console.log('Roller found, updating');
                    input = await rollService.initializeRoller(completeUserRoll);
                    console.log('Roller updated:', input);
                }
            }
        }, 500);

        //Function to add roll object to user history
    }

    function formulaModal() {

    }
    //TODO add screen sizing so that HamburgerMenu only displays on mobile

    return (
        <div className="roller-page">
            <HamburgerNav demoHistory={demoHistory} user={user} />
            <h1>Home Page</h1>
            <div>Dice Clicking Images Here</div>
            <DieImg rollDice={rollDice} rolledNumber={rolledNumber} die={die} />
            <div>{resultMessage}</div>
            <DiceForm rollForm={rollForm} handleChange={handleChange} />
            {user ?
                (
                    <>
                        <DiceFormula user={user} formulas={formulas} setUserRoll={setUserRoll} onClickHandler={setUserRoll} />
                    </>
                ) : (
                    <>
                        <DiceFormula setDemoRoll={setDemoRoll} onClickHandler={setDemoRoll}/>
                    </>
                )}
            {user ?
                (
                    <div className="add-formula-btn" onClick={toggleModal}>
                        <img src={addImg} style={{ maxWidth: '10vmin', maxHeight: '10vmin' }}></img>
                        <span>Click to add formula</span>
                    </div>
                ) : (
                    <>
                        <img src={addImg} style={{ maxWidth: '10vmin', maxHeight: '10vmin', margin: '4vmin' }}></img>
                        <span><NavLink to="/sign-up">Sign up</NavLink> or <NavLink to="/login">Log In</NavLink> to add your own formulas!</span>
                    </>
                )
            }
            <FormulaModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} user={user} addFormula={addFormula} />

            <AppFooter user={user} setUser={setUser} handleLogOut={handleLogOut} className="footer" />
        </div>
    );
}