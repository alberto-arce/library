import mongoose from "mongoose";
import { MONGODB_URI } from "../common";

const mongoUri = MONGODB_URI || 'mongodb://127.0.0.1:27017/library?authSource=admin';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};
