import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from './../CreatePost/CreatePost.js';
import Posts from './../Posts/Posts.js';
import './Dashboard.css';

const Dashboard = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [filter, setFilter] = useState('');
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

        if (filter) {
            filtered = filtered.filter(post => post.authorname.toLowerCase().includes(filter.toLowerCase()));
        }

        if (showMyPosts) {
            filtered = filtered.filter(post => post.authorname === userName);
        }

        setFilteredPosts(filtered);
    }, [filter, showMyPosts, posts, userName]);

    const fetchUserName = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserName(data.userName); // Adjust according to the actual field name
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

    const deletePost = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:8080/blogs/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    setPosts(posts.filter(post => post.id !== postId));
                    setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
                } else {
                    const data = await response.json();
                    console.error('Failed to delete post:', data.message);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
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

            <div className="filter-section">
                <label htmlFor="authorFilter">Filter by Author:</label>
                <input
                    type="text"
                    id="authorFilter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Enter author name"
                />
                <div>
                    <input
                        type="checkbox"
                        id="myPostsFilter"
                        checked={showMyPosts}
                        onChange={() => setShowMyPosts(!showMyPosts)}
                    />
                    <label htmlFor="myPostsFilter">Show My Posts Only</label>
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

            <Posts 
                posts={filteredPosts}
                onEditClick={handleEditClick} 
                onDeleteClick={deletePost} 
            />
        </div>
    );
};

export default Dashboard;
