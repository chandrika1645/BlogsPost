const { Router } = require('express');
const router = Router();
const Comment = require('../models/comment');
const userMiddleware = require('../middleware/userAuth');

router.post('/', userMiddleware, async (req, res) => {
    try {
        const { post_id, author, content } = req.body;
        const newComment = new Comment({ post_id, author, content });
        await newComment.save();
        res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.postId });
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;