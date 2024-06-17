import express from "express";
import teamController from "../controllers/teams.controller.js"; 

const { getTeamsByBoardType, deleteTeamsByBoardType } = teamController; 

const router = express.Router();

router.get("/:boardType", (req, res) => {
    console.log(`GET request received for /teams/${req.params.boardType}`);
    getTeamsByBoardType(req, res);
});
router.delete("/:boardType", (req, res) => {
    console.log(`DELETE request received for /teams/${req.params.boardType}`);
    deleteTeamsByBoardType(req, res);
});

export default router;
