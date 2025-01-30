//rollService.js

import sendRequest from "./sendRequest";

const BASE_URL = '/api/dashboard';

export async function index(userHistoryData) {
    try {
        return sendRequest(BASE_URL);
    } catch (e) {
        console.log(e);
    }
}

export async function findRoller(userId) {
    try {
        return sendRequest(`${BASE_URL}/${userId}`, 'GET');
    } catch (e) {
        console.log(e);
    }
}

export async function initializeRoller(completeUserRoll) {
    return sendRequest(`${BASE_URL}`, 'POST', completeUserRoll);
}

export async function updateRoller(example) {
    return sendRequest(BASE_URL, 'PUT', { example})
}