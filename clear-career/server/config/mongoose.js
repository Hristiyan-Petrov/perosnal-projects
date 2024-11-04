const mongoose = require('mongoose');
const config = require("./index");

module.exports = () => {
    mongoose.connect(config.DB_CONNECTION)
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
} 