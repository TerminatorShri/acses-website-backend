import { Guide } from "../models/guides.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllGuides = async (req, res) => {
    try {
        const guides = await Guide.find({});
        console.log(`Fetched guides: ${JSON.stringify(guides, null, 2)}`);
        res.status(200).json(
            new ApiResponse(200, guides, "Data Fetch Successful")
        );
    } catch (error) {
        console.error("Error fetching guides:", error);
        res.status(500).json(
            new ApiError(500, "Error in Fetching Guides Info", [error])
        );
    }
};

export default { getAllGuides };
