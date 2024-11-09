const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true
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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

module.exports = mongoose.model('User', userSchema);