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
        default: null
    },
    appliedOffers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: null
    },
    savedOffers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: null
    },
    postedOffers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Offer',
        default: null
    },
    companies: {
        type: [mongoose.Types.ObjectId],
        ref: 'Company',
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);