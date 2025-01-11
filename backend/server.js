import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { connectDB } from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname); // Outputs the directory name
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Wrap the Express app into Vercel-compatible serverless function
export default (req, res) => {
  app(req, res);
};
