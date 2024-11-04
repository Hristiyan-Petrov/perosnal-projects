const apiEndpoint = import.meta.env.VITE_API_ENDPOINT + '/api/users';

export const createUser = auth0Id => {
    return fetch(apiEndpoint + '/create', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0Id })
    });
}

export const updateSetRoleUser = (auth0Id, role) => {
    return fetch(apiEndpoint + '/set-role', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0Id, role })
    });
}

export const getUser = userId => fetch(apiEndpoint + `/${userId}`);