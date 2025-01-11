import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById, registerUserForEvent} from "../controllers/eventController.js";
import { isAdmin } from "../middleware/auth.js"; 
const router = express.Router();

router.get("/", getEvents);
router.get("/:eventId", getEventById);
router.post("/save/", isAdmin,createEvent);
router.put("/update/:eventId",isAdmin, updateEvent);
router.delete("/delete/:eventId", isAdmin,deleteEvent);
router.post("/register/:eventId", registerUserForEvent);  


export default router;
