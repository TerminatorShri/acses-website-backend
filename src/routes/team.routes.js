import express from "express";
import { Team } from "../models/team.model.js";

const router = express.Router();

router.get("/teams/:boardType", async (req, res) => {
    const boardType = req.params.boardType;
    console.log(`Received request for boardType: ${boardType}`); // Debug log

    try {
        const teamMembers = await Team.find({ boardType });
        // console.log(
        //     `Fetched team members: ${JSON.stringify(teamMembers, null, 2)}`
        // );
        res.json(teamMembers);
    } catch (error) {
        console.error("Error fetching team members:", error); // Debug log
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
