import express from "express";
import getAllGuides from "../controllers/guides.controller.js";

const router = express.Router();

router.get("/guides", getAllGuides);

export default router;
