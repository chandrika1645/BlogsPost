import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './../Comments/Comments.js';
import './PostDetail.css';

const PostDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state || {};

    if (!post) {
        return <p>No post data available. Please go back and select a post again.</p>;
    }

    const handleClose = () => {
        navigate('/dashboard');
    };

    return (
        <div className="post-detail-container">
            <button className="close-button" onClick={handleClose}>Close</button>
            <div className="post-detail-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            <div className="post-detail-comments">
                <h3>Comments</h3>
                <Comments postId={post.id} />
            </div>
        </div>
    );
};

export default PostDetail;
