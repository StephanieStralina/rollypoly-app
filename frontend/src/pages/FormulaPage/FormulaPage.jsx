import { useState } from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import DiceFormula from "../../components/DiceFormula/DiceFormula";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import './FormulaPage.css';
import addImg from '../../assets/images/addImg.png';

export default function FormulaPage({ formulas, user, toggleModal, modalIsOpen, addFormula, handleModalClose, selectedFormula, setSelectedFormula, handleUpdateFormula, handleDeleteFormula }) {

    const handleFormulaClick = (formula) => {
        setSelectedFormula(formula._id);
        toggleModal();
    };

    return (
        <div className="formula-page">
        <h2>Formula Page</h2>
            <div className="add-formula-btn" onClick={toggleModal}>
            <img src={addImg} style={{ maxWidth: '10vmin', maxHeight: '10vmin' }}></img>
            <span>Click to add formula</span>
        </div>
        <DiceFormula user={user} formulas={formulas} onClickHandler={handleFormulaClick} />
        <FormulaModal user={user} 
            addFormula={addFormula} 
            modalIsOpen={modalIsOpen} 
            toggleModal={toggleModal} 
            formulaId={selectedFormula}
            handleModalClose={handleModalClose}
            setSelectedFormula={setSelectedFormula}
            handleUpdateFormula={handleUpdateFormula}
            handleDeleteFormula={handleDeleteFormula} />
        <AppFooter className="footer"/>
        </div>
    )
}