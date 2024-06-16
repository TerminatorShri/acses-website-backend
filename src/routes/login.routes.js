import express from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const isAuthenticated =
            process.env.ADMIN_NAME === username &&
            process.env.ADMIN_PASS === password;
        console.log("Authentication For Admin");
        res.status(isAuthenticated ? 200 : 401).json(
            new ApiResponse(
                isAuthenticated ? 200 : 401,
                isAuthenticated,
                isAuthenticated
                    ? "Admin Authenticated"
                    : "Invalid email or password"
            )
        );
    } catch (error) {
        console.error("Error in Authenticating Admin", error);
        res.status(500).json(
            new ApiError(500, "Server error during authentication", [
                error.message,
            ])
        );
    }
});

export default router;
