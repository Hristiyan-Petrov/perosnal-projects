const managementClient = require("../config/auth0");
const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
    getOne: (auth0Id) => {
        return User.findOne({ auth0Id })?.lean();
    },
    update: (auth0Id, updateData) => {
        return User.updateOne({ auth0Id }, { $set: updateData });
    },
    create: (auth0Id, email) => {
        const user = new User({
            auth0Id,
            email,
        });
        return user.save();
    },
    getRole: (auth0Id) => {
        return User
            .findOne({ auth0Id })
            .select('role')
            .lean();
    },
    delete: async (auth0Id) => {
        // 1. Delete user from Auth0
        await managementClient.users.delete({ id: auth0Id });

        // 2. Delete user from Mongo
        return await User.findOneAndDelete({ auth0Id });
    },
    getCompanies: (auth0Id) => {
        return User
            .findOne({ auth0Id })
            .select('companies')
            .populate('companies')
            .lean();
    },
};