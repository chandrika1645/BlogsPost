import React from 'react';
import Comments from './../Comments/Comments.js';
import './Posts.css';

const Posts = ({ posts, onEditClick, onDeleteClick }) => {
    return (
        <div className="posts-container">
            <h2>Explore Blogs</h2>
            {posts.length === 0 ? (
                <p>No posts yet. Start writing your first post!</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <div className="post-card-controls">
                            <button
                                className="edit-button"
                                title="Edit Post"
                                onClick={() => onEditClick(post)}
                            >
                                ✎
                            </button>
                            <button
                                className="delete-button"
                                title="Delete Post"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this post?')) {
                                        onDeleteClick(post.id);
                                    }
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p className='authorName'>{`@${post.authorname}`}</p>
                        <Comments postId={post.id} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
