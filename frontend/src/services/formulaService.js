//formulaService.js
import sendRequest from "./sendRequest";

const BASE_URL = '/api/formulas';

export async function createFormula(formattedFormulaData) {
    return sendRequest(BASE_URL, 'POST',  formattedFormulaData );
}

export async function index(formulasData) {
    try {
        return sendRequest(BASE_URL);
    } catch (e) {
        console.log(e);
    }
}

export async function show(formulaId) {
    try {
        return sendRequest(`${BASE_URL}/${formulaId}`);
    } catch (e) {
        console.log(e);
    }
}

export async function update(formulaId, formulasData) {
    try {
        return sendRequest(`${BASE_URL}/${formulaId}`, 'PUT', formulasData);
    } catch (e) {
        console.log(e)
    }   
}

export async function deleteFormula(formulaId, formulasData) {
    try {
        return sendRequest(`${BASE_URL}/${formulaId}`, 'DELETE');
    } catch (e) {
        console.log(e)
    }
}