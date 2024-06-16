import dotenv from "dotenv";
import connectDB from "./db/DBConnect.js";
import app from "./app.js";

dotenv.config({
    path: "./env",
});

connectDB();
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
