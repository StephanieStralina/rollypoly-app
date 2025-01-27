
import './DiceFormula.css';

export default function DiceFormula({ setDemoRoll }) {

    return (
        <>
        <button className="dice-formula-btn" onClick={setDemoRoll}>Demo Formula</button>
        </>
    )
}