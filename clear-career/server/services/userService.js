const User = require("../models/User")

module.exports = {
    getOne: (auth0Id) => {
        return User.findOne({ auth0Id })?.lean();
    },
    update: (auth0Id, updateData) => {
        return User.updateOne({ auth0Id }, { $set: updateData });
    }
}