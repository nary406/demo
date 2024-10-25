import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserProfile from '../../models/UserProfile'; // Make sure to create a model file

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { name, email, mobileno, role, gender, image, date, degree } = req.body;
            const update = await UserProfile.findByIdAndUpdate(id, { name, email, mobileno, role, gender, image, date, degree });

            if (!update) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User updated" });
            }
        } catch (err) {
            console.error('Error updating employee:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deleteItem = await UserProfile.findByIdAndDelete(id);
            if (!deleteItem) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User deleted" });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server issue" });
        }
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}