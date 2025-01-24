import dieImg from '../../assets/images/dieImg.png';

export default function DieImg() {
    return (
        <img src={dieImg} style={{ maxWidth: '40vmin', maxHeight: '40vmin' }} alt='Image of a d20'></img>
    )
}