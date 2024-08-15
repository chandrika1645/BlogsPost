import React, { useState, useEffect } from 'react';

const CreatePost = ({ addPost, editPost, existingPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [existingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
    };

    if (existingPost) {
      // Update post
      try {
        const response = await fetch(`http://localhost:8080/blogs/${existingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (response.ok) {
          editPost(data.post);
        } else {
          console.error('Failed to update post:', data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error updating post:', error);
        alert('An error occurred while updating the post. Please try again later.');
      }
    } else {
      // Create new post
      try {
        const response = await fetch('http://localhost:8080/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (response.ok) {
          data.post.authorname = data.post.author.username;
          addPost(data.post);
        } else {
          console.error('Failed to create post:', data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('An error occurred while creating the post. Please try again later.');
      }
    }
  };

  return (
    <div className="create-post-container">
      <h2>{existingPost ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{existingPost ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default CreatePost;
