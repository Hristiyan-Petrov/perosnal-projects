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
        required: true
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
    }
});

module.exports = mongoose.model('User', userSchema);