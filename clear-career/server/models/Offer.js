const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String // TODO: Check
    },
    experience: {
        type: Number,
        required: true,
    },
    salary: {
        type: String,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    applicants: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        // default: []
    },
    views: {
        type: Number,
        default: 0
    },
    saves: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Offer', offerSchema);