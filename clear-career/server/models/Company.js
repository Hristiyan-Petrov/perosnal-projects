const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String
    },
    offers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: []
    },
    applicants: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

module.exports = mongoose.model('Company', companySchema);