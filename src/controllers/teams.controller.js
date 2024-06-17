import { Team } from "../models/team.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getTeamsByBoardType = async (req, res) => {
    const boardType = req.params.boardType;
    console.log(`Received request to fetch teams for boardType: ${boardType}`);

    try {
        const boardMembers = await Team.find({ boardType });
        console.log(
            `Fetched team members: ${JSON.stringify(boardMembers, null, 2)}`
        );
        res.status(200).json(
            new ApiResponse(200, boardMembers, "Data Fetch Successful")
        );
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json(
            new ApiError(500, "Error in Fetching Teams Info", [error])
        );
    }
};

const deleteTeamsByBoardType = async (req, res) => {
    const boardType = req.params.boardType;
    console.log(`Received request to delete teams for boardType: ${boardType}`);

    try {
        const result = await Team.deleteMany({ boardType });
        console.log(`Delete operation result: ${JSON.stringify(result)}`);
        if (result.deletedCount === 0) {
            console.log(`No teams found with boardType: ${boardType}`);
            return res
                .status(404)
                .json(
                    new ApiError(404, "No teams found for the given boardType")
                );
        }
        console.log(
            `Successfully deleted ${result.deletedCount} team(s) with boardType: ${boardType}`
        );
        res.status(200).json(
            new ApiResponse(200, null, `Deleted ${result.deletedCount} team(s)`)
        );
    } catch (error) {
        console.error("Error deleting team members:", error);

        res.status(500).json(
            new ApiError(500, "Error deleting teams", [error])
        );
    }
};

export default { getTeamsByBoardType, deleteTeamsByBoardType };
