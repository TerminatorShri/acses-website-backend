import xlsx from "xlsx";
import fs from "fs";
import { Team } from "../models/team.model.js";
import { Event } from "../models/event.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadImageToCloudinary } from "../utils/UploadToCloudinary.js";

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (
            username === process.env.ADMIN_NAME &&
            password === process.env.ADMIN_PASS
        ) {
            res.status(200).json(
                new ApiResponse(200, "Admin authenticated successfully")
            );
        } else {
            res.status(401).json(new ApiError(401, "Unauthorized"));
        }
    } catch (error) {
        console.error("Error in Authenticating Admin", error);
        res.status(500).json(
            new ApiError(500, "Server error during authentication", [
                error.message,
            ])
        );
    }
};

const promoteToMentor = async (req, res) => {
    try {
        const filePath = req.file.path;
        console.log(`Processing file: ${filePath}`);

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        console.log(`Total rows to process: ${data.length}`);

        const bulkOps = data.map((row) => {
            const { indx, experience } = row;
            return {
                updateOne: {
                    filter: { indx, boardType: "main" },
                    update: {
                        $set: {
                            boardType: "mentor",
                            experience: experience || "",
                        },
                    },
                },
            };
        });

        const bulkResult = await Team.bulkWrite(bulkOps);
        console.log(`Bulk write result: ${JSON.stringify(bulkResult)}`);

        res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Successfully promoted members to mentor and updated experiences."
            )
        );

        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    } catch (error) {
        console.error("Error promoting members to mentor:", error);
        res.status(500).json(
            new ApiError(500, "Error promoting members to mentor", [
                error.message,
            ])
        );
    }
};

const addTeamsByBoardType = async (req, res) => {
    const boardType = req.params.boardType;
    console.log(`Received request to add team for boardType: ${boardType}`);

    try {
        if (boardType === "mentor") {
            console.log("Insertion not allowed for boardType: mentor");
            return res
                .status(403)
                .json(
                    new ApiError(
                        403,
                        "Insertion not allowed for boardType: mentor"
                    )
                );
        }

        const filePath = req.file.path;
        console.log(`Processing file: ${filePath}`);

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        console.log(`Total rows to process: ${data.length}`);

        const bulkOps = data.map((row) => ({
            insertOne: {
                document: {
                    ...row,
                    boardType,
                    experience: "",
                },
            },
        }));

        const bulkResult = await Team.bulkWrite(bulkOps);
        console.log(`Bulk write result: ${JSON.stringify(bulkResult)}`);

        res.status(200).json(
            new ApiResponse(
                200,
                null,
                `Successfully added ${bulkResult.insertedCount} team members for boardType: ${boardType}.`
            )
        );

        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    } catch (error) {
        console.error("Error adding team members:", error);
        res.status(500).json(
            new ApiError(500, "Error adding team members", [error.message])
        );
    }
};

const deleteTeamsByBoardType = async (req, res) => {
    const boardType = req.params.boardType;
    console.log(`Received request to delete teams for boardType: ${boardType}`);

    try {
        if (boardType === "main") {
            console.log("Deletion not allowed for boardType: main");
            return res
                .status(403)
                .json(
                    new ApiError(
                        403,
                        "Deletion not allowed for boardType: main"
                    )
                );
        }

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

const addNewEvent = async (req, res) => {
    try {
        const { indx, name, description, eventType } = req.body;
        console.log("Received new event data:", {
            indx,
            name,
            description,
            eventType,
        });

        const uploadedPhoto = await uploadImageToCloudinary(req.file.path);

        if (!uploadedPhoto) {
            throw new Error("Failed to upload the image to Cloudinary");
        }

        const newEvent = new Event({
            indx,
            name,
            description,
            eventType,
            photo1: uploadedPhoto.url,
            eventStatus: "upcoming",
            photo2: "",
            photo3: "",
            instaUrl: "",
            linkedInUrl: "",
            photosLink: "",
        });

        await newEvent.save();

        console.log(`New event added with indx: ${indx}`);
        res.status(201).json(
            new ApiResponse(201, null, `New event added with indx: ${indx}`)
        );
    } catch (error) {
        console.error("Error adding new event:", error);
        res.status(500).json(
            new ApiError(500, "Error adding new event", [error])
        );
    }
};

const convertToPastEvents = async (req, res) => {
    try {
        const { photo1, photo2, photo3, ...eventData } = req.body;
        const uploadedPhotos = await Promise.all([
            uploadImageToCloudinary(req.files["photo1"][0].path),
            uploadImageToCloudinary(req.files["photo2"][0].path),
            uploadImageToCloudinary(req.files["photo3"][0].path),
        ]);

        if (uploadedPhotos.some((photo) => !photo)) {
            throw new Error(
                "Failed to upload one or more images to Cloudinary"
            );
        }

        const result = await Event.updateMany(
            { eventStatus: "upcoming" },
            {
                $set: {
                    ...eventData,
                    photo1: uploadedPhotos[0].url,
                    photo2: uploadedPhotos[1].url,
                    photo3: uploadedPhotos[2].url,
                    eventStatus: "past",
                },
            }
        );

        console.log(
            `Converted ${result.modifiedCount} upcoming events to past events.`
        );

        const responseMessage = `Converted ${result.modifiedCount} upcoming events to past events.`;
        res.status(200).json(new ApiResponse(200, null, responseMessage));
    } catch (error) {
        console.error("Error converting upcoming events to past:", error);
        const errorMessage = "Error converting upcoming events to past";
        res.status(500).json(new ApiError(500, errorMessage, [error]));
    }
};

const deleteEventByIndx = async (req, res) => {
    const { indx } = req.params;

    try {
        const deletedEvent = await Event.findOneAndDelete({ indx });

        if (!deletedEvent) {
            return res
                .status(404)
                .json(new ApiError(404, `Event with indx ${indx} not found`));
        }

        console.log(`Deleted event with indx ${indx}`);
        res.status(200).json(
            new ApiResponse(200, null, `Deleted event with indx ${indx}`)
        );
    } catch (error) {
        console.error(`Error deleting event with indx ${indx}:`, error);
        res.status(500).json(
            new ApiError(500, `Error deleting event with indx ${indx}`, [error])
        );
    }
};

export default {
    adminLogin,
    promoteToMentor,
    addTeamsByBoardType,
    deleteTeamsByBoardType,
    addNewEvent,
    convertToPastEvents,
    deleteEventByIndx,
};
