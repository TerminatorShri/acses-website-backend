import express from "express";
import guideController from "../controllers/guides.controller.js";

const { getAllGuides } = guideController;

const router = express.Router();

router.get("/guides", (req, res) => {
    console.log("GET request received for /guides");
    getAllGuides(req, res);
});

export default router;
