const { Router } = require('express');
const router = Router();
const Comment = require('../models/comment');
const userMiddleware = require('../middleware/userAuth');

router.post('/:postId', userMiddleware, async (req, res) => {
    try {
        const { postId } = req.params; 
        const { content } = req.body;

        const newComment = new Comment({
            post_id: postId,
            author: req.userId, 
            content
        });

        await newComment.save();
        res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:postId', userMiddleware, async (req, res) => {
    try {
        const { postId } = req.params; 

        const comments = await Comment.find({ post_id: postId }).populate('author', 'username'); 

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;