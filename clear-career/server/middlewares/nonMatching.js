const { resources } = require("../config");

module.exports = (req, res, next) => {
    const err = new Error(resources.NON_MATCHING_ERROR);
    err.status = 404;
    next(err);
}