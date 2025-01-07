import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, default: "User" },
    password: { type: String, required: true },
    savedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    profileImg: { type: String, required: true },
    isDeactived: { type: Boolean, default: false },
  },
  { collection: "userData" }
);


export default mongoose.model("User", userSchema);
