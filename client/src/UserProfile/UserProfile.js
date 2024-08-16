import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure to import the toast library
import './UserProfile.css';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setAuthorName(data.authorname);
        } else {
          toast.error(`Failed to fetch user profile: ${data.message}`);
        }
      } catch (error) {
        toast.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          authorname: authorName  
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      toast.error('Error updating profile:', error.message);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Implement the logic to update the password on the server if needed
    toast.success('Password updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogoutUser = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <div className="profile-field">
          <label className="field-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="field-input"
          />
        </div>
        <div className="profile-field">
          <label className="field-label">Author Name:</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="field-input"
          />
        </div>
        <div className="profile-field">
          <label className="field-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
          />
        </div>
        
        <div className="button-group">
          <button onClick={handleProfileUpdate} className="update-button">Update Profile</button>
          <button onClick={handleLogoutUser} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
