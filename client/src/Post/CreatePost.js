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

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      id: existingPost ? existingPost.id : Date.now(),
      title,
      content,
    };
    if (existingPost) {
      editPost(postData);
    } else {
      addPost(postData);
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
