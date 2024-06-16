import express from "express";
import getTeamsByBoardType from "../controllers/teams.controller.js";

const router = express.Router();

router.get("/:boardType", getTeamsByBoardType);

export default router;
