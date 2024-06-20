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


export default { getTeamsByBoardType };
