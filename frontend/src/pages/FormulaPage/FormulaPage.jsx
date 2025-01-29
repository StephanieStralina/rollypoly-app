import AppFooter from "../../components/AppFooter/AppFooter";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import './FormulaPage.css';

export default function FormulaPage({ formulas, user, toggleModal, modalIsOpen, addFormula}) {

    return (
        <div className="formula-page">
        <h2>Formula Page</h2>
        <DiceFormula user={user} formulas={formulas} onClickHandler={toggleModal} />
        <FormulaModal user={user} addFormula={addFormula} modalIsOpen={modalIsOpen} toggleModal={toggleModal} />
        <AppFooter className="footer"/>
        </div>
    )
}