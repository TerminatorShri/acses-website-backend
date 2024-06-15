import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    indx: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    linkedInUrl: {
        type: String,
        required: true,
    },
    instaUrl: {
        type: String,
    },
});

export const Mentor = mongoose.model("Mentor", mentorSchema);
