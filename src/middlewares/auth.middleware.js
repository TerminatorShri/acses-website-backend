import { ApiError } from "../utils/ApiError.js";

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json(
                new ApiError(401, "Unauthorized", [
                    "Authorization header missing",
                ])
            );
    }

    const [username, password] = authHeader.split(" ");

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

    if (isAuthenticated) {
        next();
    } else {
        res.status(401).json(
            new ApiError(401, "Invalid username or password", [
                "Invalid credentials",
            ])
        );
    }
};

export default authenticateAdmin;
