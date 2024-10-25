const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

export default async function handler(req, res) {
    const { name, password } = req.body;

    if (name !== "pavan") {
        return res.status(404).send({ error: 'User not found' });
    }

    if (password !== "pavan123") {
        return res.status(401).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ username: name }, process.env.JWT_SECRET || 'secret_key');
    res.status(200).json({ token });
}
