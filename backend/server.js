import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { connectDB } from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Increase the payload size limit
app.use(bodyParser.json({ limit: "50mb" })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
// Middleware to parse JSON requests (allow us to get json data as request)
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});