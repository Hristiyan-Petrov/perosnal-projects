const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const setRoleService = (auth0Id, role) => {
    return fetch(apiEndpoint + '/api/users/set-role', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0Id, role })
    });
}

export const getUser = userId => fetch(apiEndpoint + `/api/users/${userId}`);