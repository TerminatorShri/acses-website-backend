import express from "express";
import cors from "cors";
import {
    teamRouter,
    eventRouter,
    guideRouter,
    adminRouter,
} from "./routers.js";

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

app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/guides", guideRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
