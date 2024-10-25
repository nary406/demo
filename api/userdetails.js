import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
});

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileno: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    degree:{type:String},
    date:{type:String}
});

const UserProfile = mongoose.model("pavanDetails", employeeSchema);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const employees = await UserProfile.find();
            res.json(employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({ message:'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}