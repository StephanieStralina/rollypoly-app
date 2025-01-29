import sendRequest from "./sendRequest";

const BASE_URL = '/api/';

export async function initializeRoller(example) {
    return sendRequest(BASE_URL, 'POST', { example });
}