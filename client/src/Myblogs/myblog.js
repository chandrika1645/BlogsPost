import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './myblog.css'; 
import { FaTrashAlt } from 'react-icons/fa'; 


const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        const response = await axios.get('http://localhost:8080/user/blogs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/blogs/${postId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setPosts(posts.filter(post => post._id !== postId)); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditClick = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };

  const handleSaveClick = async (postId) => {
    try {
      const token = localStorage.getItem('authToken');

      await axios.put(`http://localhost:8080/blogs/${postId}`, 
        { content: editedContent }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setPosts(posts.map(post => post._id === postId ? { ...post, content: editedContent } : post));
      setEditingPostId(null);
      setEditedContent(""); 
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingPostId(null); 
    setEditedContent(""); 
  };

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <p>No posts yet. Start writing your first post!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              {editingPostId !== post._id && (
                <FaTrashAlt 
                  className="delete-icon" 
                  onClick={() => handleDelete(post._id)} 
                  title="Delete Post" 
                />
              )}
            </div>
            {editingPostId === post._id ? (
              <div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="10"
                  cols="45"
                  className="edit-textarea"
                />
                <div className="button-group">
                  <button onClick={() => handleSaveClick(post._id)} className="save-button">Save</button>
                  <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="post-content">{post.content}</p>
                <div className="button-group">
                  <button onClick={() => handleEditClick(post._id, post.content)} className="update-button">Edit</button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
