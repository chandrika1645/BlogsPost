import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './Posts.css';

const Posts = ({ posts, onEditClick, onDeleteClick }) => {
    const navigate = useNavigate();

    const handlePostClick = (post) => {
        navigate(`/posts/${post.id}`, { state: { post } });
    };

    return (
        <div className="posts-container">
            <h2>Explore Blogs</h2>
            {posts.length === 0 ? (
                <p>No posts yet. Start writing your first post!</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
                        <div className="post-card-controls">
                            <button
                                className="edit-button"
                                title="Edit Post"
                                onClick={(e) => { e.stopPropagation(); onEditClick(post); }}
                            >
                                <FaEdit className="icon" />
                            </button>
                            <button
                                className="delete-button"
                                title="Delete Post"
                                onClick={(e) => { e.stopPropagation(); onDeleteClick(post.id); }}
                            >
                                <FaTrashAlt className="icon" />
                            </button>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p className='authorName'>{`@${post.authorname}`}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
