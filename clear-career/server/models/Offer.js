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
    },
    salary: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Offer', offerSchema);