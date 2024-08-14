import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from './../Post/CreatePost.js';
import './Dashboard.css';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // If no token is found, redirect to login page
            navigate('/login');
        }
    }, [navigate]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
        togglePopup();
    };

    const editPost = (updatedPost) => {
        setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
        setEditingPost(null);
        togglePopup();
    };

    const deletePost = (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    const handleEditClick = (post) => {
        setEditingPost(post);
        togglePopup();
    };

    const handleProfileNavigation = () => {
        navigate('/profile');
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard</h1>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Create New Blog Post</h3>
                    <p>Start writing a new blog post and share your thoughts with the world.</p>
                    <button onClick={() => { setEditingPost(null); togglePopup(); }}>Create Post</button>
                </div>

                <div className="dashboard-card">
                    <h3>User Settings</h3>
                    <p>Manage your account settings and personal information.</p>
                    <button onClick={handleProfileNavigation}>Settings</button>
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <CreatePost 
                            addPost={addPost} 
                            editPost={editPost} 
                            existingPost={editingPost} 
                        />
                        <button className="close-button" onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}

            <div className="posts-container">
                <h2>Your Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts yet. Start writing your first post!</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-card-controls">
                                <button className="edit-button" title="Edit Post" onClick={() => handleEditClick(post)}>✎</button>
                                <button className="edit-button" title="Delete Post" onClick={() => deletePost(post.id)}>🗑️</button>
                            </div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
