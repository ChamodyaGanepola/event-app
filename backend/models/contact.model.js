import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const contactSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      default: function () {
        return uuidv4(); //  Generate a unique UUID for each contact entry
      },
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Store submission timestamp
  },
  { collection: "contactMessages" }
);

export default mongoose.model("Contact", contactSchema);
