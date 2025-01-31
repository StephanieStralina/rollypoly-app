//RollerPage.jsx
import DieImg from "../../components/DieImg/DieImg";
import { NavLink } from 'react-router';
import { useState, useEffect, useRef } from "react";
import * as rollService from '../../services/rollService';
import './RollerPage.css'
import DiceForm from "../../components/DiceForm/DiceForm";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import HamburgerNav from "../../components/HamburgerNav/HamburgerNav";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import addImg from '../../assets/images/addImg.png';
import RollyPolyLogoV2 from '../../assets/images/RollyPolyLogoV2.png';
import d4 from '../../assets/images/d4.png';
import d6 from '../../assets/images/d6.png';
import d8 from '../../assets/images/d8.png';
import d10 from '../../assets/images/d10.png';
import d12 from '../../assets/images/d12.png';
import d20 from '../../assets/images/d20.png';


export default function RollerPage({ user,
    handleLogOut, die, formulas, addFormula, formulaData, setFormulaData, userHistory, setUserHistory,
    toggleModal, modalIsOpen, setUserRoll, demoHistory, setDemoHistory,
    groupList, newGroup, handleNewGroupChange, handleAddNewGroup, handleGroupFilterChange, selectedGroup }) {
    const [rolledNumber, setRolledNumber] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [resultMessage, setResultMessage] = useState(
        <>
            <div>Click the dice to roll!</div>
            <div>&nbsp;</div>
        </>);
    const [rollCount, setRollCount] = useState(0);
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: die || 20,
        modifier: 0,
        source: 'manual',
        formula: null,
    });
    const topRef = useRef(null);

    useEffect(() => {
        async function fetchUserHistory() {
            if (user) {
                const history = await rollService.index();
                setUserHistory(history);
            }
        }
        fetchUserHistory();
    }, [user, rollCount]);

    function scrollToTop() {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    function handleDiceSelection(sides) {
        setRollForm(rollForm => ({
            ...rollForm,
            diceSides: sides,
            source: 'manual',
            formula: null,
        }));
    }

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
        setRolling(true);
        const interval = setInterval(() => {
            setRolledNumber(Math.floor(Math.random() * rollForm.diceSides) + 1);
        }, 35);

        setTimeout(async () => {
            clearInterval(interval);
            const results = [];
            const numDice = rollForm.numDice || 1; 
            const diceSides = rollForm.diceSides || 20;
            const modifier = parseInt(rollForm.modifier, 10) || 0;
            for (let i = 0; i < numDice; i++) {
                results.push(Math.floor(Math.random() * diceSides) + 1);
            }
            const totalRoll = results.reduce((sum, roll) => sum + roll, 0);
            const finalResult = totalRoll + modifier;
            const finalColor = getRollColor(finalResult);

            setRolledNumber(finalResult);
            setRolling(false);
            setResultMessage(
                <>
                    <div>You rolled a <span style={{ color: finalColor, fontWeight: "bold", textDecoration: "underline" }}>{finalResult}!</span></div>
                    <div>({results.join(" + ")} on your {numDice}d{diceSides} + {modifier} modifier)</div>
                </>
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
                const completeUserRoll = {
                    result: finalResult,
                    numDice: numDice,
                    diceSides: diceSides,
                    modifier: modifier,
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
    
    
    const getRollColor = (number) => {
        if (number === null || number === undefined) {
            return 'black'; 
        }
        if (number >= 20) {
            return "#005b94"; 
        } else if (number <= 1) {
            return "#D06E1B";  
        } else {
            return "#428D0B";
        }
    };

    const rollColor = rolling ? '#000000' : getRollColor(rolledNumber);

    return (
        <div className="roller-page">
                <HamburgerNav
                    demoHistory={demoHistory}
                    userHistory={userHistory}
                    user={user}
                    handleLogOut={handleLogOut} />
            <div className="backdrop">
                <div ref={topRef}></div>
                <img src={RollyPolyLogoV2} style={{ maxHeight: '9vmin', paddingTop: '1.5vmin' }} alt="A picture of a green logo reading RollyPolly" />
                <div className="diceImgs">
                    <img src={d4} onClick={() => handleDiceSelection(4)} />
                    <img src={d6} onClick={() => handleDiceSelection(6)} />
                    <img src={d8} onClick={() => handleDiceSelection(8)} />
                    <img src={d10} onClick={() => handleDiceSelection(10)} />
                    <img src={d12} onClick={() => handleDiceSelection(12)} />
                    <img src={d20} onClick={() => handleDiceSelection(20)} />
                </div>
                <DieImg
                    rollDice={rollDice}
                    rolledNumber={rolledNumber}
                    die={die}
                    rollColor={rollColor} />
                <div className="result-message">
                    {resultMessage}
                </div>
                <DiceForm rollForm={rollForm} handleChange={handleChange} />
                {user ?
                    (
                        <div className="add-formula-btn" onClick={toggleModal}>
                            <img className="plus-img" src={addImg}
                                style={{ width: '8vmin', height: '8vmin' }}></img>
                            <span className="add-subtext">Click to add formula</span>
                        </div>
                    ) : (
                        <>
                            <img src={addImg}
                                style={{ width: '8vmin', height: '8vmin'}}></img>
                            <span><NavLink to="/sign-up">Sign up</NavLink> or <NavLink to="/login">Log In</NavLink> to add your own formulas!</span>
                        </>
                    )
                }
                {user ?
                    (
                        <>
                            <DiceFormula
                                user={user}
                                formulas={formulas}
                                setUserRoll={setUserRoll}
                                onClickHandler={(formula) => {
                                    setUserRoll(formula);
                                    scrollToTop();
                                }}
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
            </div>
            
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
                
        </div>
    );
}