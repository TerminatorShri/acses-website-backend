import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
    indx: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
});

export const Guide = mongoose.model("Guide", guideSchema);
