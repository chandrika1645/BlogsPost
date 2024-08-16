import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import UserProfile from './UserProfile/UserProfile';
import PostDetail from './PostDetails/PostDetail.js';
import Myblogs from "./Myblogs/myblog.js"

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/myblogs" element={<Myblogs />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
