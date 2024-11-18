import apiRequest from "./requester";

const usersEndpoint = import.meta.env.VITE_API_ENDPOINT + '/users';
const auth0Endpoints = {
    resetPassword: `https://${import.meta.VITE_AUTH0_DOMAIN}/dbconnections/change_password`,
};

export default {
    createUser: (auth0Id, email) => {
        return apiRequest(`${usersEndpoint}/create`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ auth0Id, email })
            });
    },
    updateSetRoleUser: (auth0Id, role) => {
        return apiRequest(`${usersEndpoint}/set-role`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth0Id, role })
        });
    },
    getUser: userId => apiRequest(`${usersEndpoint}/${userId}`),
    getUserInitial: userId => apiRequest(`${usersEndpoint}/${userId}/initial`),
    getUserRole: userId => apiRequest(`${usersEndpoint}/${userId}/role`),
    getUserCompanies: (userId) => apiRequest(`${usersEndpoint}/${userId}/companies`),
    resetPassword: email => {
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
    },
    deleteAccount: (userId) => {
        return apiRequest(`${usersEndpoint}/${userId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    saveToggleOffer: (auth0Id, offerId) => {
        return apiRequest(`${usersEndpoint}/${auth0Id}/save-offer/${offerId}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            }
        })
    },
}