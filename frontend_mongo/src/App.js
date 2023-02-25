import './App.css';
import { Routes, Route, Navigate} from "react-router-dom";
import React from 'react';

import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { useSelector } from 'react-redux';
import FeedPage from './pages/FeedPage/FeedPage';
import Post from './pages/Post/Post';
import ReqPacket from './pages/ReqPacket/ReqPacket';

function App() {
  const auth = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to={!auth ? `/login` : `/feed`} />}/>
        {!auth && <Route path="/login" element={<Login />} />}
        {!auth && <Route path="/signup" element={<Signup />} />}
        {auth && <Route path="/feed" element={<FeedPage />} /> }
        {auth && <Route path="/feed/:postId" element={<Post />} /> }
        <Route path="/request" element={<ReqPacket />} />      
      </Routes>
    </Layout>
  );
}

export default App;
