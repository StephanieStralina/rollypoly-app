
import './DiceFormula.css';

export default function DiceFormula({ setDemoRoll, setUserRoll, user, formulas }) {

    return (
        <div className='dice-formulas'>
            {user ? (
                    formulas.map((formula) => (
                        <button key={formula._id} className='dice-formula-btn'
                            onClick={() => setUserRoll({
                                numDice: formula.numDice,
                                diceSides: formula.diceSides,
                                modifier: formula.modifier,
                                source: 'formula',
                            })} >{formula.name}</button>
                    ))
            ) : (
                <>
                    <button className="dice-formula-btn" onClick={() => setDemoRoll(1, 20, 5, 'formula')}>Demo - Roll to Attack</button>
                    <button className="dice-formula-btn" onClick={() => setDemoRoll(2, 12, 3, 'formula')}>Demo - Roll Damage</button>
                    <button className="dice-formula-btn" onClick={() => setDemoRoll(1, 20, 3, 'formula')}>Demo - Roll WIS Save</button>
                </>
            )}
        </div>
    )
}