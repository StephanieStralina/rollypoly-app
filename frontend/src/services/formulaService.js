import sendRequest from "./sendRequest";

const BASE_URL = '/api/dashboard';

export async function createFormula(formattedFormulaData) {
    return sendRequest(BASE_URL, 'POST', { formattedFormulaData });
}