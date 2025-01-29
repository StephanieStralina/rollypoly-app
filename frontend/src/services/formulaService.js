import sendRequest from "./sendRequest";

const BASE_URL = '/api/dashboard';
const BASE_URL2 = '/api/formulas';

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
        return sendRequest(`${BASE_URL2}/${formulaId}`);
    } catch (e) {
        console.log(e);
    }
}

export async function update(formulaId, formulasData) {
    try {
        return sendRequest(`${BASE_URL2}/${formulaId}`, 'PUT', formulasData);
    } catch (e) {
        console.log(e)
    }   
}