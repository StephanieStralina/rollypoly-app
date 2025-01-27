import { useState } from 'react';
import dieImg from '../../assets/images/dieImg.png';
import './DieImg.css'


export default function DieImg({ rolledNumber, die, rollDice}) {

    return (
        <div className='die-container' onClick={rollDice} >
            <img src={dieImg} alt='Image of a d20' />
            <div className='die-text'>
                {rolledNumber || die}
            </div>
        </div>
    )
}