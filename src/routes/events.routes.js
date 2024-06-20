import express from "express";
import eventController from "../controllers/events.controller.js";

const { getEventsByType, getUpcomingEvents, getMostRecentEvent } =
    eventController;

const router = express.Router();

router.get("/:eventType", (req, res) => {
    const eventType = req.params.eventType;
    console.log(`GET request received for /events/${eventType}`);
    getEventsByType(req, res);
});
router.get("/upcoming", (req, res) => {
    console.log("GET request received for /events/upcoming");
    getUpcomingEvents(req, res);
});
router.get("/most-recent", (req, res) => {
    console.log("GET request received for /events/most-recent");
    getMostRecentEvent(req, res);
});

export default router;
