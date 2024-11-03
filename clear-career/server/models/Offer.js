const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        rows: "4",
        cols: "50",
    },
    requirements: {
        rows: "4",
        cols: "50",
    },
    salary: {
        type: String,
    },
});

module.exports = mongoose.model('Offer', offerSchema);