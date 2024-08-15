// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaPlus, FaUserCog } from 'react-icons/fa';

const Navbar = ({ onCreatePostClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">BlogNest</Link>
            </div>
            <div className="navbar-links">
                <button className="navbar-button" onClick={onCreatePostClick}>
                    <FaPlus size={20} />
                    <span>Create Post</span>
                </button>
                <Link to="/profile" className="navbar-button">
                    <FaUserCog size={20} />
                    <span>User Settings</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
