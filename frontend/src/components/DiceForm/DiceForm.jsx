//DiceForm.jsx

import { useState } from 'react';
import './DiceForm.css';

export default function DiceForm({rollForm, handleChange}) {

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