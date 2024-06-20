import express from "express";
import authenticateAdmin from "../middlewares/auth.middleware.js";
import adminController from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const {
    adminLogin,
    promoteToMentor,
    deleteAssistantTeam,
    addNewEvent,
    convertToPastEvents,
} = adminController;

const router = express.Router();

router.post("/login", authenticateAdmin, (req, res) => {
    console.log("POST request received for /admin/login");
    adminLogin(req, res);
});

router.patch(
    "/teams/promote",
    authenticateAdmin,
    upload.single("boardInfo"),
    (req, res) => {
        console.log("PATCH request received for /admin/teams/promote");
        promoteToMentor(req, res);
    }
);
router.post("/teams/:boardType", authenticateAdmin, (req, res) => {
    console.log(
        `POST request received for /admin/teams/${req.params.boardType}`
    );
    // Add Controller
});
router.delete("/teams/:boardType", authenticateAdmin, (req, res) => {
    console.log(
        `DELETE request received for /admin/teams/${req.params.boardType}`
    );
    deleteAssistantTeam(req, res);
});

router.post(
    "/events/add-event",
    authenticateAdmin,
    upload.single("photo1"),
    (req, res) => {
        console.log("POST request received for /admin/events/add-event");
        addNewEvent(req, res);
    }
);
router.patch(
    "/events/convert-past",
    authenticateAdmin,
    upload.fields([
        { name: "photo1", maxCount: 1 },
        { name: "photo2", maxCount: 1 },
        { name: "photo3", maxCount: 1 },
    ]),
    (req, res) => {
        console.log("POST request received for admin/events/convert-past");
        convertToPastEvents(req, res);
    }
);

export default router;
