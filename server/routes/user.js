const { Router } = require("express");
const router = Router();
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/userAuth');
const zod = require('zod');
const JWT_SECRET = process.env.JWT_SECRET;

const schema = zod.object({
    username: zod.string().min(5, { message: "Username is too small" }),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(7, { message: "Password must meet complexity requirements" }),
    authorname: zod.string().min(5, { message: "Author name must be more than 5 characters" })
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, authorname } = req.body;
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message);
            return res.status(400).json({ message: errorMessages.join(", ") });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists, Please login" });
        }

        const newUser = new User({ username, email, password, authorname });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const truthy = await bcrypt.compare(password, user.password)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router