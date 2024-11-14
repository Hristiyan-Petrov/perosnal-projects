const User = require("../models/User");
const Company = require("../models/Company");

module.exports = {
    create: async ({ title, description, imageUrl, auth0Id }) => {
        const user = await User.findOne({ auth0Id });

        const company = new Company({
            title,
            description,
            imageUrl,
            offers: [],
            applicants: [],
            creator: user._id
        });
        await company.save();
        
        user.companies.push(company._doc);
        await user.save();
        return company;
    },

    getOffers: (companyId) => {
        return Company
            .findById(companyId)
            .select('title offers')
            .populate({
                path: 'offers',
                populate: {
                    path: 'company',
                    model: 'Company',
                    select: 'imageUrl'
                }
            })
            .lean();
    }
};