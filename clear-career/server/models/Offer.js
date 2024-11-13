const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    },
    description: {
        type: String
    },
    requirements: {
        type: String // TODO: Check
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