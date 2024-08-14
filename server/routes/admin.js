const { Router } = require("express");
const adminMiddleware = require("../middleware/adminAuth");
const User = require('../models/user'); 
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({ 
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
});

router.get('/users', adminMiddleware, async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id',adminMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;