import React, { useEffect, useState  } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector, } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress1 from '../loading/CircularProgress'
import Post from '../Posts/Post/Post';
import { getPostsByCreator, getLikedPosts } from '../../actions/posts';
import CreatorOrTag from '../CreatorOrTag/CreatorOrTag'
import LikedPosts from '../Profile/LikedPosts'

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
    const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    dispatch(getLikedPosts(id));
  }, []);

  if (!posts.length && !isLoading) return 'No posts';
  console.log(posts)


 // if (!posts.length && !isLoading) return 'No posts';
  //console.log(posts)

  
  return (
    <div style={{ paddingTop: 120 }}>
    <Tabs
        style={{ marginBottom: 15 }}
        value={activeTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="посты" />
        <Tab label="Понравившиеся" />
      </Tabs>
      {activeTab === 0 && (
        <div>
          {/* Содержимое для вкладки "посты" */}
         
          <CreatorOrTag></CreatorOrTag>
  
        </div>
      )}
  {activeTab === 1 && (
        <div>
          {/* Содержимое для вкладки "посты" */}
          
          <LikedPosts></LikedPosts>
        </div>
      )}
</div>

  );
};

export default Profile;
