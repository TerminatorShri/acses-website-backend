import express from "express";
import cors from "cors";
import teamRouter from "./routes/team.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
import eventRouter from "./routes/events.routes.js";
import guideRouter from "./routes/guides.routes.js";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1", teamRouter);
app.use("/api/v1", mentorRouter);
app.use("/api/v1", eventRouter);
app.use("/api/v1", guideRouter);

export default app;
