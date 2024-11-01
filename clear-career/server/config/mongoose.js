import mongoose from "mongoose";
import config from "./index.js";

export default () => {
    mongoose.connect(config.DB_CONNECTION)
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
} 