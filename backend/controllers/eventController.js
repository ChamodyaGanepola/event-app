import mongoose from "mongoose";
import Event from "../models/event.model.js";


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error in Get Events:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createEvent = async (req, res) => {
  const { title, date, location, description, img, createdBy } = req.body;

  if (!title || !date || !location || !description || !img || !createdBy) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newEvent = new Event({
    title,
    date,
    location,
    description,
    img,
    createdBy,
  });

  try {

    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Error in Create Event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const event = req.body;

  try {
    // Find and update the event using the eventId
    const updatedEvent = await Event.findOneAndUpdate({ eventId }, event, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }


    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    console.error("Error in Update Event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await Event.findOneAndDelete({ eventId });

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event Deleted" });
  } catch (error) {
    console.error("Error in Delete Event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    console.log(event);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error in Get Event by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Register user for an event
export const registerUserForEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body; // Assuming userId is provided in the body of the request

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the user is already registered for the event
    if (event.registeredUsers.includes(userId)) {
      return res.status(400).json({ success: false, message: "User is already registered for this event" });
    }

    // Add userId to the registeredUsers array
    event.registeredUsers.push(userId);

    // Save the event with the updated registeredUsers
    await event.save();

    res.status(200).json({ success: true, message: "User successfully registered for the event" });
  } catch (error) {
    console.error("Error in Registering User:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};