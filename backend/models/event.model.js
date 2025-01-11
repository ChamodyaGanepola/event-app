import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Event Schema
const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      default: function () {
        return uuidv4(); // Generate a unique UUID each time an event is created
      },
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      year: {
        type: Number,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      Date: {
        type: Number,
        required: true,
      },
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    registeredUsers: {
      type: [String], // Array of user IDs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const Event = mongoose.model("Event", eventSchema);
export default Event;
