import express from "express";
import { Mentor } from "../models/mentor.model.js";

const router = express.Router();

router.get("/mentors", async (req, res) => {
    try {
        const mentorsInfo = await Mentor.find({});
        // console.log(
        //     `Fetched mentors: ${JSON.stringify(mentorsInfo, null, 2)}`
        // );
        res.json(mentorsInfo);
    } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
