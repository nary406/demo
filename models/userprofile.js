import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileno: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    degree: { type: String, required: true },
    date: { type: String, required: true }
});

const UserProfile = mongoose.models.pavanDetails || mongoose.model("pavanDetails", employeeSchema);
export default UserProfile;
