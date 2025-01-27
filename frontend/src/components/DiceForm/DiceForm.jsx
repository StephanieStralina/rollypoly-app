
import { useState } from 'react';
import './DiceForm.css';

export default function DiceForm() {
    const [rollForm, setRollForm] = useState({
        numDice: 1,
        diceSides: 20,
        modifier: 0,
    });

    return (
        <>
        <form>
            <input type="number" name="numDice" value={rollForm.numDice} required/>
            <input type="number" name="diceSides" value={rollForm.diceSides} required />
            <input type="number" name="modifier" value={rollForm.modifier} required />
        </form>
        </>
    )
}