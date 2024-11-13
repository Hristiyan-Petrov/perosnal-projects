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
});

module.exports = mongoose.model('Company', companySchema);