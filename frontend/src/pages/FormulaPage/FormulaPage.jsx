//FormulaPage.jsx

import DiceFormula from "../../components/DiceFormula/DiceFormula";
import FormulaModal from "../../components/FormulaModal/FormulaModal";
import HamburgerNav from "../../components/HamburgerNav/HamburgerNav";
import './FormulaPage.css';
import addImg from '../../assets/images/addImg.png';

export default function FormulaPage({ formulas, user, handleLogOut, userHistory,
    toggleModal, modalIsOpen, addFormula, handleModalClose, selectedFormula,
    setSelectedFormula, handleUpdateFormula, handleDeleteFormula, formulaData, setFormulaData,
    groupList, newGroup, handleNewGroupChange, handleAddNewGroup,
    selectedGroup, handleGroupFilterChange }) {

    const handleFormulaClick = (formula) => {
        setSelectedFormula(formula._id);
        toggleModal();
    };

    return (
        <div className="formula-page">
                <HamburgerNav
                    userHistory={userHistory}
                    user={user}
                    handleLogOut={handleLogOut} />
            <div className="backdrop flex-end">
                <h2>Formula Page</h2>
                <div className="add-formula-btn" onClick={toggleModal}>
                    <img src={addImg} style={{ maxWidth: '10vmin', maxHeight: '10vmin' }}></img>
                    <span style={{ fontSize: '1em', fontWeight: '300' }}>Click to add formula</span>
                </div>
                <DiceFormula
                    user={user}
                    formulas={formulas}
                    onClickHandler={handleFormulaClick}
                    selectedGroup={selectedGroup}
                    handleGroupFilterChange={handleGroupFilterChange}
                    groupList={groupList}
                />
            </div>
                <FormulaModal user={user}
                    addFormula={addFormula}
                    modalIsOpen={modalIsOpen}
                    toggleModal={toggleModal}
                    formulaId={selectedFormula}
                    handleModalClose={handleModalClose}
                    setSelectedFormula={setSelectedFormula}
                    handleUpdateFormula={handleUpdateFormula}
                    handleDeleteFormula={handleDeleteFormula}
                    groupList={groupList}
                    newGroup={newGroup}
                    handleNewGroupChange={handleNewGroupChange}
                    handleAddNewGroup={handleAddNewGroup}
                    formulaData={formulaData}
                    setFormulaData={setFormulaData} />
        </div>
    )
}