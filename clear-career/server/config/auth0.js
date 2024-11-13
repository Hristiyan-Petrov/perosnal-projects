require('dotenv').config();
const { ManagementClient } = require('auth0');

const managementClient = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

module.exports = managementClient;