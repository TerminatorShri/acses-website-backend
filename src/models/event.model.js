import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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
        photo1: {
            type: String,
            required: true,
        },
        photo2: {
            type: String,
        },
        photo3: {
            type: String,
        },
        instaUrl: {
            type: String,
        },
        linkedInUrl: {
            type: String,
        },
        photosLink: {
            type: String,
        },
        eventType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model("Event", eventSchema);
