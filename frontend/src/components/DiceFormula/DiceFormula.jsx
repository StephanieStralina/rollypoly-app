
import './DiceFormula.css';

export default function DiceFormula({ setDemoRoll }) {

    return (
        <div className='dice-formulas'>
        <button className="dice-formula-btn" onClick={() => setDemoRoll(1, 20, 5)}>Demo - Roll to Attack</button>
        <button className="dice-formula-btn" onClick={() => setDemoRoll(2, 12, 3)}>Demo - Roll Damage</button>
        <button className="dice-formula-btn" onClick={() => setDemoRoll(1, 20, 3)}>Demo - Roll WIS Save</button>
        </div>
    )
}