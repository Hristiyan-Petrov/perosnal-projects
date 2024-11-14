const Offer = require("../models/Offer");
const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
    create: async ({ title, category, companyName, description, experience, salaryFrom, salaryTo, auth0Id }) => {
        const user = await User.findOne({ auth0Id });
        const company = await Company.findOne({ title: companyName });

        const offer = new Offer({
            title,
            category,
            description,
            experience,
            salary: salaryFrom ? salaryFrom + '-' + salaryTo : null,
            creator: user._id,
            company
        });
        await offer.save();

        user.postedOffers.push(offer._doc);
        await user.save();

        company.offers.push(offer._doc);
        await company.save();

        return offer;
    },
};

// 'We need a master farmer to join our team. He will take care of the animals which we use to play with and let them join us during our working process. This significantly improves our mood and therefore business results. Animals include cute farm animals and pets.'