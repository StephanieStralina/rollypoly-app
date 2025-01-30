import sendRequest from "./sendRequest";

const BASE_URL = '/api/groups';

export async function createGroup(groupData) {
    return sendRequest(BASE_URL, 'POST', groupData);
}

export async function indexGroups() {
    return sendRequest(BASE_URL, 'GET');
}