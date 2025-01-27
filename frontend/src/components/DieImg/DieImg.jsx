import { useState } from 'react';
import dieImg from '../../assets/images/dieImg.png';
import './DieImg.css'


export default function DieImg() {
    const [die, setDie] = useState(20);
    const [rolledNumber, setRolledNumber] = useState(null);
    const [diceSides, setDiceSides] = useState(null);

    function rollDice() {
        setRolledNumber(Math.floor(Math.random() * die) + 1);
    }

    return (
        <div className='die-container' onClick={rollDice}>
            <img src={dieImg} alt='Image of a d20' />
            <div className='die-text'>
                {rolledNumber || die}
            </div>
        </div>
    )
}