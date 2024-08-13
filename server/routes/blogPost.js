const { Router } = require('express');
const BlogPost = require('../models/blogPost');
const userMiddleware = require('../middleware/userAuth');
const router = Router();

router.post('/', userMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const authorId = req.userId;

        const newPost = new BlogPost({ title, content, author: authorId });
        await newPost.save();
        res.status(201).json({ message: 'Blog post created', post: newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', userMiddleware, async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', userMiddleware, async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', userMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, content, updated_at: Date.now() }, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post updated', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', userMiddleware, async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
