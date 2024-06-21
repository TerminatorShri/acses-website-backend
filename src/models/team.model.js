import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        indx: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        post: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
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
        boardType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Team = mongoose.model("Team", teamSchema);
