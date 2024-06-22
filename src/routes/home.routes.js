import express from "express";
import homeController from "../controllers/home.controller.js";

const { getAllGuides, contactUs } = homeController;

const router = express.Router();

router.get("/guides", (req, res) => {
    console.log("GET request received for /home/guides");
    getAllGuides(req, res);
});

router.post("/contact", (req, res) => {
    console.log("POST request received for /home/contact");
    contactUs(req, res);
});

export default router;
