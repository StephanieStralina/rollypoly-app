import sendRequest from "./sendRequest";

const BASE_URL = '/api/';

export async function initialize(content) {
    return sendRequest(BASE_URL, 'POST', { content });
}