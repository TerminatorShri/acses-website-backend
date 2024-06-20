import express from "express";
import teamController from "../controllers/teams.controller.js";

const { getTeamsByBoardType } = teamController;

const router = express.Router();

router.get("/:boardType", (req, res) => {
    console.log(`GET request received for /teams/${req.params.boardType}`);
    getTeamsByBoardType(req, res);
});

export default router;
