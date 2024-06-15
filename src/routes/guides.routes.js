import express from "express";
import { Guide } from "../models/guides.model.js";

const router = express.Router();

router.get("/guides", async (req, res) => {
    try {
        const guideInfo = await Guide.find({});
        // console.log(
        //     `Fetched guides: ${JSON.stringify(guideInfo, null, 2)}`
        // );
        res.json(guideInfo);
    } catch (error) {
        console.error("Error fetching guides:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
