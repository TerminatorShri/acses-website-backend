import cloudinary from "../db/CloudinaryConfig.js";
import fs from "fs";

const uploadImageToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No local file path provided");
            return null;
        }

        console.log(`Uploading image from local file: ${localFilePath}`);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("Cloudinary upload response:", response);

        fs.unlinkSync(localFilePath);
        console.log(`Deleted local file: ${localFilePath}`);

        return response;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        try {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
                console.log(
                    `Deleted local file due to error: ${localFilePath}`
                );
            }
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }

        return null;
    }
};

export { uploadImageToCloudinary };
