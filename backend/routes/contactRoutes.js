import express from "express";
import { getContacts, createContact, getContactById, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContacts); // Get all contact messages
router.post("/", createContact); // Submit a new contact message
router.get("/:contactId", getContactById); // Get a contact message by ID
router.delete("/:contactId", deleteContact); // Delete a contact message

export default router;
