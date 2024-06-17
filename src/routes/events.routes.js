import express from "express";
import eventController from "../controllers/events.controller.js"; 

const { getEventsByType } = eventController; 

const router = express.Router();

router.get("/:eventType", (req, res) => {
    console.log("GET request received for /:eventType");
    getEventsByType(req, res);
});

export default router;
