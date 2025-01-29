import sendRequest from "./sendRequest";

const BASE_URL = '/api/dashboard';

export async function findRoller(userId) {
    return sendRequest(`${BASE_URL}/${userId}`, 'GET');
}

export async function initializeRoller(example) {
    return sendRequest(BASE_URL, 'POST', { example });
}

export async function updateRoller(example) {
    return sendRequest(BASE_URL, 'PUT', { example})
}