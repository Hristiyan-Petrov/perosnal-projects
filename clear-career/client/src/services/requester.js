export default async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || ERROR_MESSAGES.apiRequest);
        }

        if (url.includes('auth0')) {
            return response;
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};