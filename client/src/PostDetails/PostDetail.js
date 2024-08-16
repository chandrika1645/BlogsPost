import React , {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './../Comments/Comments.js';
import { FaComments } from 'react-icons/fa';
import './PostDetail.css';

const PostDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state || {};
    const [showComments, setShowComments] = useState(false);

    if (!post) {
        return <p>No post data available. Please go back and select a post again.</p>;
    }

    const handleClose = () => {
        navigate('/dashboard');
    };

    function toggleComments() {
        setShowComments(!showComments);
    }    

    return (
        <div className="post-detail-container">
            <button className="close-button" onClick={handleClose}>Go Back</button>
            <div className="post-detail-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            <div className={`post-detail-comments ${showComments ? 'show' : ''}`} id="comments-section">
                <h3>Comments</h3>
                <Comments postId={post.id} />
            </div>
            <div className="chat-icon" onClick={toggleComments}>
                <FaComments />
            </div>
        </div>

    );
};

export default PostDetail;
