//DiceFormula.jsx

import './DiceFormula.css';

export default function DiceFormula({ setDemoRoll, setUserRoll, user, formulas, onClickHandler, selectedGroup, handleGroupFilterChange, groupList, formula }) {

    return (
        <div className='dice-formulas'>
            {user ? (
                <>
                <div className='group-select'>
                      <select value={selectedGroup} onChange={handleGroupFilterChange}>
                        <option value="All Formulas">All Formulas</option>
                        {groupList.map((group) => (
                          <option key={group._id} value={group._id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                </div>
                    {formulas.map((formula) => (
                        <button key={formula._id} className='dice-formula-btn'
                        onClick={() => onClickHandler(formula)} >{formula.name}</button>
                    ))}
                    <div>&nbsp;</div>
                </>
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