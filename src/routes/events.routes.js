import express from "express";
import { Event } from "../models/event.model.js";

const router = express.Router();

router.get("/events/:eventType", async (req, res) => {
    const eventType = req.params.eventType;
    // console.log(`Received request for eventType: ${eventType}`);

    try {
        const eventInfo = await Event.find({ eventType });
        // console.log(
        //     `Fetched evenInfo: ${JSON.stringify(evenInfo, null, 2)}`
        // );
        res.json(eventInfo);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
