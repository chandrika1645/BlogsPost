import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ content: '' });
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        fetchComments();
        fetchUserProfile(); // Fetch user profile to get the author's name
    }, [postId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments/${postId}`);
            const data = await response.json();
            if (response.ok) {
                setComments(data.comments);
            } else {
                console.error('Failed to fetch comments:', data.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/profile', { // Adjust the URL if necessary
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setAuthorName(data.username); // Adjust according to the actual field in your response
            } else {
                console.error('Failed to fetch user profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    content: newComment.content, 
                    author: authorName // Include authorName in request body
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setComments([...comments, data.comment]);
                setNewComment({ content: '' });
            } else {
                console.error('Failed to add comment:', data.message);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p><strong>{comment.author.username}</strong>: {comment.content}</p> {/* Adjust based on actual response */}
                        <small>{new Date(comment.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label>Comment:</label>
                    <textarea
                        name="content"
                        value={newComment.content}
                        onChange={handleCommentChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Comments;
