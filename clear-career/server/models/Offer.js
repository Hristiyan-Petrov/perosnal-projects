import mongoose from "mongoose";

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

export default mongoose.model('Offer', offerSchema);


