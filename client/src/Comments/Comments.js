import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ content: '' });

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            const response = await fetch(`http://localhost:8080/comments/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
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
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            const response = await fetch(`http://localhost:8080/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: newComment.content }),
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
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p><strong>{comment.author.username}</strong>: {comment.content}</p> 
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
