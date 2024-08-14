import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState('default-photo.jpg');
  const [dob, setDob] = useState('');
  const [number, setNumber] = useState('');
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
          setDob(data.dob || '');
          setNumber(data.number || '');
          setEmail(data.email);
          setAuthorName(data.authorname);
        } else {
          console.error('Failed to fetch user profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Profile updated successfully!');
    // Implement the logic to update the profile on the server
  };

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Password updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
    // Implement the logic to update the password on the server
  };

  const handleLogoutUser = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-photo">
        <img src={photo} alt="Profile" />
        <input type="file" onChange={handlePhotoChange} />
      </div>
      <div className="profile-info">
        <div className="profile-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Author Name:</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Number:</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button onClick={handleProfileUpdate}>Update Profile</button>
        <div className="profile-field">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="profile-field">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handlePasswordUpdate}>Update Password</button>
        <button onClick={handleLogoutUser}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
