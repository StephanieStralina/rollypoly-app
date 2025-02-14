//DieImg.jsx
import dieImg from '../../assets/images/dieImg.png';
import './DieImg.css'


export default function DieImg({ rolledNumber, die, rollDice, rollColor }) {


    return (
        <div className='die-container' onClick={rollDice} >
            <img src={dieImg} alt='Image of a d20 20-sided die with the result of a dice roll inside' />
            <div className='die-text poppins-extrabold' style={{ color: rollColor }}>
                {rolledNumber || die}
            </div>
        </div>
    )
}