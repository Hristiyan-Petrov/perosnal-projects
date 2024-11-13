// Handle errors that occur during the processing of a request
// like errors from your database or your code

const { resources } = require("../config");

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || resources.ERROR_HANDLER_MESSAGE;
    res.status(err.status).json({ message: err.message });
};
