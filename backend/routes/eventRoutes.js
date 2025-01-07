import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:eventId", getEventById);
router.post("/save/", createEvent);
router.put("/update/:eventId", updateEvent);
router.delete("/delete/:eventId", deleteEvent);

export default router;
