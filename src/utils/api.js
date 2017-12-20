import axios from 'axios';

export async function fetchApiData(url) {
    const fetchUrl = `http://localhost:3001${url}`;
    return await axios
        .get(fetchUrl, {
            headers: { Authorization: 'whatever-you-want' },
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            throw new Error(error);
        });
}

export async function updateApiData(url, value) {
    const fetchUrl = `http://localhost:3001${url}`;
    return await axios
        .put(fetchUrl, value, {
            headers: { Authorization: 'whatever-you-want' },
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            throw new Error(error);
        });
}

export async function sendApiData(url, value) {
    const fetchUrl = `http://localhost:3001${url}`;
    return await axios
        .post(fetchUrl, value, {
            headers: { Authorization: 'whatever-you-want' },
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            throw new Error(error);
        });
}

export async function deleteApiData(url) {
    const fetchUrl = `http://localhost:3001${url}`;
    return await axios
        .delete(fetchUrl, {
            headers: { Authorization: 'whatever-you-want' },
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            throw new Error(error);
        });
}
