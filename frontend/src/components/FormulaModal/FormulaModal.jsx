import { useState, useEffect } from 'react';
import * as formulaService from '../../services/formulaService';
import './FormulaModal.css'

export default function FormulaModal({ modalIsOpen, toggleModal, user, addFormula, formulaId, handleModalClose, setSelectedFormula }) {

    const [formulaData, setFormulaData] = useState({
        name: '',
        numDice: 1,
        diceSides: 20,
        modifier: 0,
        group: 'None',
    })
    
    useEffect(() => {
        if (!formulaId) {
            setFormulaData({
                name: '',
                numDice: 1,
                diceSides: 20,
                modifier: 0,
                group: 'None',
            });
            return;
        }
        const controller = new AbortController(); 
        const fetchFormula = async () => {
            try {
                const formulaDetails = await formulaService.show(formulaId, { signal: controller.signal });
                setFormulaData(formulaDetails);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching formula:", error);
                }
            }
        };
        fetchFormula();
        return () => {
        };
    }, [formulaId, modalIsOpen]);


    function onChange(evt){
        setFormulaData({
            ...formulaData,
            [evt.target.name]: evt.target.value,
        });
    }

    async function submitFormula(evt) {
        evt.preventDefault();
        try {
            const formattedFormulaData = {
                ...formulaData,
                numDice: Number(formulaData.numDice),
                diceSides: Number(formulaData.diceSides),
                modifier: Number(formulaData.modifier),
            };
            await addFormula(formattedFormulaData)
            setFormulaData({
                name: '',
                numDice: 1,
                diceSides: 20,
                modifier: 0,
                group: 'None',
            });
            handleModalClose();
        } catch (e) {
            console.error('Error submitting formula:', error);
        }
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
                        Collection:
                        <select
                            name="group"
                            value={formulaData.group}
                            onChange={onChange}
                        >
                            <option value="None">None</option>
                        </select>
                    </label>
                    <button type="submit">{formulaId ? ('Update Formula') : ('Save Formula')}</button>
                </form>
                {formulaId ? (<button type="delete">Delete</button>) : ""}
            </div>
        </div>
    );
}