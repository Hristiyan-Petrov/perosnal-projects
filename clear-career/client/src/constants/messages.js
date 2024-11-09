export const AUTH_MESSAGES = {
    loginRequired: "Please log in to access this page.",
    accessDenied: "You are not authorized to view this page.",
    sessionExpired: "Your session has expired. Please log in again.",
    loginSuccess: 'Successfully logged in!',
    logoutSuccess: 'Successfully logged out!',
    roleCompletion: 'Welcome back! Please set role to complete your profile'
};

export const AUTH_LOCAL_STORAGE_KEYS = {
    loginNotification: 'hasLoggedIn', 
    logoutNotification: 'hasLoggedOut', 

};

export const ERROR_MESSAGES = {
    defaultMessage: 'Whoopsy! Somehting went wrong!',
    defaultCode: '404',
    defaultDescription: 'We’re sorry, but the page you’re looking for doesn’t exist or an unexpected error has occurred.',
    apiRequest: 'API request failed'
};