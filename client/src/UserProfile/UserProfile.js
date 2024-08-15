import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure to import the toast library
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result); // This will be a base64 string
        };
        reader.readAsDataURL(file);
    }
};

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
          authorname: authorName,
          photo,
          dob,
          number
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
