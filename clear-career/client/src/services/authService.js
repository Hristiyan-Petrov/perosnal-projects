import apiRequest from "./requester";

const usersEndpoint = import.meta.env.VITE_API_ENDPOINT + '/users';
const auth0Endpoints = {
    resetPassword: `https://${import.meta.VITE_AUTH0_DOMAIN}/dbconnections/change_password`,
};

export const createUser = (auth0Id, email) => {
    return apiRequest(`${usersEndpoint}/create`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth0Id, email })
        });
};

export const updateSetRoleUser = (auth0Id, role) => {
    return apiRequest(`${usersEndpoint}/set-role`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auth0Id, role })
    });
};

export const getUser = userId => apiRequest(`${usersEndpoint}/${userId}`);
export const getUserInitial = userId => apiRequest(`${usersEndpoint}/${userId}/initial`);
export const getUserRole = userId => apiRequest(`${usersEndpoint}/${userId}/role`);
export const getUserCompanies = (userId) => apiRequest(`${usersEndpoint}/${userId}/companies`);

export const resetPassword = email => {
    return apiRequest(auth0Endpoints.resetPassword, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            email,
            connection: 'Username-Password-Authentication'
        })
    });
};

export const deleteAccount = (userId, accessToken) => {
    return apiRequest(`${usersEndpoint}/${userId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
};
