import { ERROR_MESSAGES } from "../constants/messages";

const usersEndpoint = import.meta.env.VITE_API_ENDPOINT + '/users';

const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();

            // Specific case for initial user creation. do not change!
            // if (errorData.message === 'No such user') {
            //     return errorData;
            // }

            throw new Error(errorData.message || ERROR_MESSAGES.apiRequest);
        }

        return await response.json();
        return response;
    } catch (error) {
        console.error('API request error:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const createUser = auth0Id => {
    return apiRequest(`${usersEndpoint}/create`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth0Id })
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
}

export const getUser = userId => apiRequest(`${usersEndpoint}/${userId}`);
export const getUserInitial = userId => apiRequest(`${usersEndpoint}/${userId}/initial`);