import apiRequest from "./requester";

const companiesEndpoint = import.meta.env.VITE_API_ENDPOINT + '/companies';

export const create = (formData) => {
    return apiRequest(`${companiesEndpoint}/create`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
};

export const getOffers = (companyId) => {
    return apiRequest(`${companiesEndpoint}/${companyId}/offers`);
};