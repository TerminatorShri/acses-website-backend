import { Event } from "../models/event.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getEventsByType = async (req, res) => {
    const eventType = req.params.eventType;
    console.log(`Received request for eventType: ${eventType}`);

    try {
        const eventInfo = await Event.find({ eventType });
        console.log(`Fetched eventInfo: ${JSON.stringify(eventInfo, null, 2)}`);
        res.status(200).json(
            new ApiResponse(200, eventInfo, "Data Fetch Successful")
        );
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json(
            new ApiError(500, "Error in Fetching Events Info", [error])
        );
    }
};

export default getEventsByType;
