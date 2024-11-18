export const AUTH_MESSAGES = {
    loginRequired: "Please log in to access this page.",
    accessDenied: "You are not authorized to view this page.",
    sessionExpired: "Your session has expired. Please log in again.",
    loginSuccess: 'Successfully logged in!',
    logoutSuccess: 'Successfully logged out!',
    roleCompletion: 'Welcome back! Please set role to complete your profile'
};

export const LOCAL_STORAGE_KEYS = {
    loginNotification: 'hasLoggedIn',
    logoutNotification: 'hasLoggedOut',
    navigate: 'navigate'
};

export const ERROR_MESSAGES = {
    defaultMessage: 'Whoopsy! Somehting went wrong!',
    defaultCode: '404',
    defaultDescription: 'We’re sorry, but the page you’re looking for doesn’t exist or an unexpected error has occurred.',
    apiRequest: 'API request failed',
    saveToggleOffer: 'Sorry. The action failed.'
};

export const ITEM_MESSAGES = {
    emptyDashboard: 'No offers yet',
    emptyCompaniesDashboard: 'You Have No Companies',
    emptyCompanyOffersDashboard :'Still Does Not Have Active Offers',
    companiesDashboardAddButton: 'Add Your Company',
    companyOffersDashboardAddButton: 'Add Offer To Your Company'
};

export const TITLES = {
    dashboard: 'Job Offers',
    companiesDashboard: 'Your companies',
    companyOffers: 'Offers from',
};

export const CONFIRMATION_DIALOG_RESOURCES = {
    ACCOUNT_DELETE_ID: 'account-delete-dialog',
    ACCOUNT_DELETE_TITLE: "Are you absolutely sure you want to delete your account?",
    ACCOUNT_DELETE_CONTENT_TEXT: 'This action cannot be undone. This will permanently delete your account and remove all your data from our servers.',
    ACCOUNT_DELETE_CONFIRM_BUTTON_TEXT: 'Delete Account',
    ACCOUNT_DELETE_CONFIRM_BUTTON_TEXT_LOADING: 'Deleting account...',
    MATERIAL_BUTTON_COLOR_ERROR: 'error',
    MATERIAL_BUTTON_COLOR_PRIMARY: 'primary',

    OFFER_DELETE_ID: 'offer-delete-dialog',
    OFFER_DELETE_TITLE: "Are you sure you want to delete this job offer? This action cannot be undone.",
    OFFER_DELETE_CONTENT_TEXT: 'This action cannot be undone. This will permanently delete your job offer and remove all its data from our servers.',
    OFFER_DELETE_CONFIRM_BUTTON_TEXT: 'Delete Offer',
    OFFER_DELETE_CONFIRM_BUTTON_TEXT_LOADING: 'Deleting offer...',

    OFFER_APPLY_ID: 'offer-apply-dialog',
    OFFER_APPLY_TITLE: "Are you sure you want to apply for this job offer?",
    // OFFER_APPLY_CONTENT_TEXT: 'This action will send your personal information. This will permanently delete your job offer and remove all its data from our servers.',
    OFFER_APPLY_CONFIRM_BUTTON_TEXT: 'Apply',
    OFFER_APPLY_CONFIRM_BUTTON_TEXT_LOADING: 'Applying...',
    OFFER_APPLY_SUCCESS_MESSAGE: 'Successfully applied for the offer'
};

export const ITEM_TYPES = {
    offer: 'offer',
    company: 'company'
};