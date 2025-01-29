import { useState } from 'react';
import './FormulaModal.css'

export default function formulaModal({ isOpen, toggleModal, user, addFormula}) {
    const [formulaData, setFormulaData] = useState({
        name: '',
        numDice: 1,
        diceSides: 20,
        modifier: 0,
        collection: 'None',
    })
    

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
            toggleModal();
        } catch (e) {
            console.error('Error submitting formula:', error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(evt) => evt.stopPropagation()}>
                <button className="close-btn" onClick={toggleModal}>×</button>
                <h2>Add New Formula</h2>
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
                            name="collection"
                            value={formulaData.collection}
                            onChange={onChange}
                        >
                            <option value="None">None</option>
                            <option value="All">All</option>
                        </select>
                    </label>
                    <button type="submit">Save Formula</button>
                </form>
            </div>
        </div>
    );
}