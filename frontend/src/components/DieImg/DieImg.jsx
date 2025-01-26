import dieImg from '../../assets/images/dieImg.png';
import './DieImg.css'


export default function DieImg() {
    return (
        <div className='die-container'>
            <img src={dieImg} alt='Image of a d20' />
            <div className='die-text'>
                20
            </div>
        </div>
    )
}