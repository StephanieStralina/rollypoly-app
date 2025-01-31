//DiceForm.jsx
import './DiceForm.css';

export default function DiceForm({rollForm, handleChange}) {

    return (
        <>
        <form className='roll-form'>
        <div className="form-field">
        <input
          type="number"
          name="numDice"
          value={rollForm.numDice}
          onChange={handleChange}
          required
        />
        <label htmlFor="numDice">Number of Dice</label>
      </div>
      <div className='form-field'>
        <p>d</p>
      </div>
      <div className="form-field">
        <input
          type="number"
          name="diceSides"
          value={rollForm.diceSides}
          onChange={handleChange}
          required
        />
        <label htmlFor="diceSides">Sides per Die</label>
      </div>
      <div className='form-field'>
        <p>+</p>
      </div>
      <div className="form-field">
        <input
          type="number"
          name="modifier"
          value={rollForm.modifier}
          onChange={handleChange}
          required
        />
        <label htmlFor="modifier">Modifier</label>
      </div>
        </form>
        </>
    )
}

