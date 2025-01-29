import sendRequest from "./sendRequest";

const BASE_URL = '/api/dashboard';

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
