import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';  
import eventRoutes from './routes/eventRoutes.js';  
import userRoutes from './routes/userRoutes.js';  
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Increase the payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

//routes
app.use("/api/events", eventRoutes); 
app.use("/api/users", userRoutes);    


connectDB();

export default app;  //  serverless handler
