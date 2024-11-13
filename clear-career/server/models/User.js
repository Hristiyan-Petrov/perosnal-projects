const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['job-seeker', 'job-offerer'],
    },
    appliedOffers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: []
    },
    postedOffers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: []
    },
    companies: {
        type: [mongoose.Types.ObjectId],
        ref: 'Company',
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);