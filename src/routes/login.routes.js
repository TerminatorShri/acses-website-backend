import express from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log("Received POST request for /login");

    try {
        const { username, password } = req.body;
        console.log(
            `Received credentials - Username: ${username}, Password: [hidden]`
        );

        const isAuthenticated =
            process.env.ADMIN_NAME === username &&
            process.env.ADMIN_PASS === password;

        console.log(
            isAuthenticated
                ? "Admin authenticated successfully"
                : "Invalid username or password"
        );

        res.status(isAuthenticated ? 200 : 401).json(
            new ApiResponse(
                isAuthenticated ? 200 : 401,
                isAuthenticated,
                isAuthenticated
                    ? "Admin Authenticated"
                    : "Invalid username or password"
            )
        );
    } catch (error) {
        console.error("Error in Authenticating Admin", error);
        res.status(500).json(
            new ApiError(500, "Server error during authentication", [error])
        );
    }
});

export default router;
