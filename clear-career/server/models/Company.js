const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Company', companySchema);