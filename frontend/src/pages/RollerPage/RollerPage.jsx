//RollerPage.jsx
import DieImg from "../../components/DieImg/DieImg";
import { NavLink } from 'react-router';
import { useState, useEffect } from "react";
import * as rollService from '../../services/rollService';
import * as groupService from '../../services/groupService';
import './RollerPage.css'
import AppFooter from "../../components/AppFooter/AppFooter";
import DiceForm from "../../components/DiceForm/DiceForm";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import HamburgerNav from "../../components/HamburgerNav/HamburgerNav";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import addImg from '../../assets/images/addImg.png';


export default function RollerPage({ user,
    setUser, handleLogOut, die, formulas, addFormula, formulaData, setFormulaData,
    toggleModal, modalIsOpen, setUserRoll,
    groupList, newGroup, handleNewGroupChange, handleAddNewGroup, handleGroupFilterChange, selectedGroup }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [resultMessage, setResultMessage] = useState("Click the dice to roll!");
    const [demoHistory, setDemoHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [rollCount, setRollCount] = useState(0);
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: die || 20,
        modifier: 0,
        source: 'manual',
        formula: null,
    });
    //TODO: Add onClick change die and dieImg for rolls

    useEffect(() => {
        async function fetchUserHistory() {
            if (user) {
                const history = await rollService.index();
                setUserHistory(history);
            }
        }
        fetchUserHistory();
    }, [user, rollCount]);


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

                if (!input) {
                    input = await rollService.initializeRoller(completeUserRoll);
                } else {
                    input = await rollService.initializeRoller(completeUserRoll);
                }
            }
        }, 500);
        setRollCount(rollCount + 1);
    }

    //TODO add screen sizing so that HamburgerMenu only displays on mobile and other menu displays on desktop

    return (
        <div className="roller-page">
            <HamburgerNav
                demoHistory={demoHistory}
                userHistory={userHistory}
                user={user} />
            <h1>Home Page</h1>
            <div>Dice Clicking Images Here</div>
            <DieImg
                rollDice={rollDice}
                rolledNumber={rolledNumber}
                die={die} />
            <div>{resultMessage}</div>
            <DiceForm rollForm={rollForm} handleChange={handleChange} />
            {user ?
                (
                    <>
                        <DiceFormula
                            user={user}
                            formulas={formulas}
                            setUserRoll={setUserRoll}
                            onClickHandler={setUserRoll}
                            selectedGroup={selectedGroup}
                            handleGroupFilterChange={handleGroupFilterChange}
                            groupList={groupList} />
                    </>
                ) : (
                    <>
                        <DiceFormula
                            setDemoRoll={setDemoRoll}
                            onClickHandler={setDemoRoll} />
                    </>
                )}
            {user ?
                (
                    <div className="add-formula-btn" onClick={toggleModal}>
                        <img src={addImg}
                            style={{ maxWidth: '10vmin', maxHeight: '10vmin' }}></img>
                        <span>Click to add formula</span>
                    </div>
                ) : (
                    <>
                        <img src={addImg}
                            style={{ maxWidth: '10vmin', maxHeight: '10vmin', margin: '4vmin' }}></img>
                        <span><NavLink to="/sign-up">Sign up</NavLink>
                            or <NavLink to="/login">Log In</NavLink> to add your own formulas!</span>
                    </>
                )
            }
            <FormulaModal
                modalIsOpen={modalIsOpen}
                toggleModal={toggleModal}
                user={user}
                addFormula={addFormula}
                groupList={groupList}
                newGroup={newGroup}
                handleNewGroupChange={handleNewGroupChange}
                handleAddNewGroup={handleAddNewGroup}
                formulaData={formulaData}
                setFormulaData={setFormulaData} />

            <AppFooter
                user={user}
                setUser={setUser}
                handleLogOut={handleLogOut}
                className="footer" />
        </div>
    );
}