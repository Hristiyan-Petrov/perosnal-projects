const User = require("../models/User")

module.exports = {
    getOne: (auth0Id) => {
        return User.findOne({ auth0Id })?.lean();
    },
    update: (auth0Id, updateData) => {
        return User.updateOne({ auth0Id }, { $set: updateData });
    },
    create: (auth0Id, email) => {
        const user = new User({ auth0Id, email, role: null, appliedOffers: [], postedOffers: [] });
        return user.save();
    },
    getRole: (auth0Id) => {
        return User
            .findOne({ auth0Id })
            .select('role')
            .lean();
    },
}