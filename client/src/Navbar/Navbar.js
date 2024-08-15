import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaUserCircle, FaBook } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onCreatePostClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/dashboard">BlogNest</Link>
            </div>
            <div className="navbar-links">
                <button className="navbar-button" onClick={onCreatePostClick}>
                <FaPen size={20} />
                <span>Write Blog</span>
                </button>
                <Link to="/profile" className="navbar-button">
                <FaUserCircle size={20} />
                <span>My Profile</span>
                </Link>
                <Link to="/my-blogs" className="navbar-button">
                <FaBook size={20} />
                <span>My Blogs</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
