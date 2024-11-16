const managementClient = require("../config/auth0");
const User = require("../models/User");
const Offer = require("../models/Offer");

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
    saveToggle: async (auth0Id, offerId) => {
        const user = await User
            .findOne({ auth0Id })
            .select('savedOffers')

        const offer = await Offer
            .findById(offerId)
            .select('savedFromUsers')

        const isSaved = user._doc.savedOffers.some(o => o == offerId);

        if (isSaved) {
            // Remove from saved
            user.savedOffers = user.savedOffers.filter(o => o != offerId);
            offer.savedFromUsers = offer.savedFromUsers.filter(u => u != user._id.toString());
        } else {
            // Add to saved
            user.savedOffers.push(offer);
            offer.savedFromUsers.push(user);
        }

        await user.save();
        await offer.save();

        return user;
    }
};