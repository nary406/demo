import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserProfile from "../models/userprofile"; // Make sure to create a model file

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

export default async function handler(req, res) {
    try {
        const employees = await UserProfile.find();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
