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

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find()
            .populate('author', 'authorname email'); 

        const formattedPosts = posts.map(post => ({
            id: post._id,
            title: post.title,
            content: post.content,
            authorname: post.author ? post.author.authorname : 'Unknown' ,
            email: post.author ? post.author.email : 'Unknown'
        }));

        res.json(formattedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', userMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        const post = await BlogPost.findById(id).populate('author');

        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        if (post.author._id.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.updated_at = new Date();

        await post.save();

        res.json({ message: 'Blog post updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', userMiddleware, async (req, res) => {
    try {
        const { id } = req.params; 
        const post = await BlogPost.findById(id).populate('author');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author._id.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await BlogPost.findByIdAndDelete(id);

        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
