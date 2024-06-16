import express from "express";
import getEventsByType from "../controllers/events.controller.js";

const router = express.Router();

router.get("/:eventType", getEventsByType);

export default router;
