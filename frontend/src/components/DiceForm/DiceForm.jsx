
import { useState } from 'react';
import './DiceForm.css';

export default function DiceForm() {
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: 20,
        modifier: 0,
    });

    function handleChange(evt) {
        setRollForm({ ...rollForm, [evt.target.name]: evt.target.value });
    }

    return (
        <>
        <form>
            <input type="number" name="numDice" value={rollForm.numDice} onChange={handleChange} required/>
            <input type="number" name="diceSides" value={rollForm.diceSides} onChange={handleChange} required />
            <input type="number" name="modifier" value={rollForm.modifier} onChange={handleChange} required />
        </form>
        </>
    )
}