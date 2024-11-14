const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
    create: async ({ title, description, imageUrl, auth0Id }) => {
        const user = await User
            .findOne({ auth0Id })
            // .select('_id companies')
            // .populate('companies')
            // .lean();
        const company = new Company({
            title,
            description,
            imageUrl,
            offers: [],
            applicants: [],
            owner: user._id
        });
        await company.save();
        user.companies.push(company._doc);
        await user.save();
        return company;
    },
};