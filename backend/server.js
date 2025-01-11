import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';  // MongoDB connection
import eventRoutes from './routes/eventRoutes.js';  // Event routes
import userRoutes from './routes/userRoutes.js';  // User routes
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Increase the payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Use event and user routes
app.use("/api/events", eventRoutes);  // Use event routes at "/api/events"
app.use("/api/users", userRoutes);    // Use user routes at "/api/users"

// Connect to DB and start the Express server
connectDB();

export default app;  // This will be your serverless handler
