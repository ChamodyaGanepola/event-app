import mongoose from "mongoose";

//to connect to the database
export const connectDB =async () => {
   try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);  
   } catch (error) {
     console.error(`Error: ${error.message}`);
     process.exit(1); //0-success 1-failure
   } 
};