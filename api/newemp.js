import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserProfile from  "../models/userprofile"
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, mobileno, role, gender, image, date, degree } = req.body;

            if (!email.endsWith("@gmail.com")) {
                return res.status(400).json({ message: 'Invalid email' });
            }

            const employee = new UserProfile({ name, email, mobileno, role, date, gender, image, degree });
            await employee.save();
            res.status(200).json(employee);
        } catch (err) {
            console.error('Error creating employee:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
