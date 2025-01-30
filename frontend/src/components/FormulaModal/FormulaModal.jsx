//FormulaModal.jsx

import { useEffect } from 'react';
import * as formulaService from '../../services/formulaService';
import './FormulaModal.css'

export default function FormulaModal({ modalIsOpen, toggleModal, user, addFormula, formulaId, formulaData, setFormulaData, handleModalClose, setSelectedFormula, handleUpdateFormula, handleDeleteFormula, groupList, newGroup, handleNewGroupChange, handleAddNewGroup }) {


    useEffect(() => {
        if (!formulaId) {
            setFormulaData({
                name: '',
                numDice: 1,
                diceSides: 20,
                modifier: 0,
                group: null,
            });
            return;
        } else {
            const controller = new AbortController();
            const fetchFormula = async () => {
                try {
                    const formulaDetails = await formulaService.show(formulaId, { signal: controller.signal });
                    setFormulaData({
                        ...formulaDetails,
                        group: formulaDetails.group ? formulaDetails.group._id : null,
                    });
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error("Error fetching formula:", error);
                    }
                }
            }
            fetchFormula();
        };
    }, [formulaId, modalIsOpen]);


    function onChange(evt) {
        const { name, value } = evt.target;

        if (name === 'group') {
            setFormulaData({
                ...formulaData,
                [name]: value === 'None' ? null : value,
            });
        } else {
            setFormulaData({
                ...formulaData,
                [name]: value,
            });
        }
    }

    async function submitFormula(evt) {
        evt.preventDefault();
        const formattedFormulaData = {
            ...formulaData,
            numDice: Number(formulaData.numDice),
            diceSides: Number(formulaData.diceSides),
            modifier: Number(formulaData.modifier),
            group: formulaData.group || null,
        };
        if (formulaId) {
            try {
                await handleUpdateFormula(formulaId, formattedFormulaData);
            } catch (e) {
                console.error('Error submitting formula:', e);
            }
        } else {
            try {
                await addFormula(formattedFormulaData)
            } catch (e) {
                console.error('Error submitting formula:', e);
            }
        }
        setFormulaData({
            name: '',
            numDice: 1,
            diceSides: 20,
            modifier: 0,
            group: 'None',
        });
        handleModalClose;
    }

    if (!modalIsOpen) return null;



    return (
        <div className="modal-overlay" onClick={formulaId ? handleModalClose : toggleModal}>
            <div className="modal-content" onClick={(evt) => evt.stopPropagation()}>
                <button className="close-btn" onClick={formulaId ? handleModalClose : toggleModal}>×</button>
                {formulaId ? (
                    <h2>Edit Formula</h2>
                ) : (
                    <h2>Add New Formula</h2>
                )}
                <form onSubmit={submitFormula}>
                    <label>
                        Formula Name:
                        <input type="text" name="name" value={formulaData.name} onChange={onChange} required />
                    </label>
                    <label>
                        Number of Dice:
                        <input type="number" name="numDice" value={formulaData.numDice} onChange={onChange} required />
                    </label>
                    <label>
                        Dice Sides:
                        <input type="number" name="diceSides" value={formulaData.diceSides} onChange={onChange} required />
                    </label>
                    <label>
                        Modifier:
                        <input type="number" name="modifier" value={formulaData.modifier} onChange={onChange} required />
                    </label>

                    <label>
                        Group:
                        <select
                            name="group"
                            value={formulaData.group}
                            onChange={onChange}
                        >
                            <option value="None">None</option>
                            {groupList.map((group) => (
                                <option key={group._id} value={group._id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </label>


                    <label>
                        Add New Group:
                        <input
                            type="text"
                            value={newGroup}
                            onChange={handleNewGroupChange}
                            placeholder="Enter new group"
                        />
                        <button type="button" onClick={handleAddNewGroup}>Add Group</button>
                    </label>


                    <button type="submit">{formulaId ? ('Update Formula') : ('Save Formula')}</button>
                </form>
                {formulaId ? (<button type="delete" onClick={() => handleDeleteFormula(formulaId)}>Delete</button>) : ""}
            </div>
        </div>
    );
}