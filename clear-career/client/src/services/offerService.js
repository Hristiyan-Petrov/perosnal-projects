import apiRequest from "./requester";

const companiesEndpoint = import.meta.env.VITE_API_ENDPOINT + '/offers';

export default {
    create: (formData) => {
        return apiRequest(`${companiesEndpoint}/create`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    },
    getAll: () => {
        return apiRequest(companiesEndpoint);
    },
    getOne: (offerId) => apiRequest(`${companiesEndpoint}/${offerId}`),
};