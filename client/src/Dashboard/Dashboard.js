import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from './../CreatePost/CreatePost.js';
import Posts from './../Posts/Posts.js';
import Navbar from './../Navbar/Navbar.js';
import './Dashboard.css';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserName();
            fetchPosts();
        }
    }, [navigate]);

    useEffect(() => {
        let filtered = posts;

        if (showMyPosts) {
            filtered = filtered.filter(post => post.authorname === userName);
        }

        setFilteredPosts(filtered);
    }, [showMyPosts, posts, userName]);

    const fetchUserName = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserName(data.userName); 
            } else {
                console.error('Failed to fetch user name:', data.message);
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/blogs', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPosts(data);
                setFilteredPosts(data);
            } else {
                console.error('Failed to fetch posts:', data.message);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
        setFilteredPosts([...filteredPosts, newPost]);
        togglePopup();
    };
    
    

    const editPost = (updatedPost) => {
        const updatedPosts = posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setEditingPost(null);
        togglePopup();
    };

    const handleCreatePostClick = () => {
        setEditingPost(null);
        togglePopup();
    };

    return (
        <div className="dashboard-container">
            <Navbar onCreatePostClick={handleCreatePostClick} />
            <div className="dashboard-content">
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <CreatePost 
                                addPost={addPost} 
                                editPost={editPost} 
                                existingPost={editingPost} 
                            />
                            <button className="close-button" onClick={togglePopup}>Close</button>
                        </div>
                    </div>
                )}
                <h2>Explore Blogs</h2>
                <Posts 
                    posts={filteredPosts}
                />
            </div>
        </div>
    );
};

export default Dashboard;
