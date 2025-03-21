const config = {
    development: {
        PORT: process.env.port || 5000,
        DB_CONNECTION: 'mongodb://localhost/clear-career',
        SALT_ROUNDS: 10,
        SECRET_KEY: 'navuhodonosor',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'insert for example mongodb atlas connection',      // Create Atlas Cloud Mongo DB 
        SECRET_KEY: 'navuhodonosor',
    }
};

const env = process.env.NODE_ENV || 'development'; // default to 'development' if NODE_ENV is not set

const resources = {
    ERROR_HANDLER_MESSAGE: 'Something went wrong',
    NON_MATCHING_ERROR: 'The API route is found'
};

module.exports = {
    config: config[env.trim()],
    resources
}