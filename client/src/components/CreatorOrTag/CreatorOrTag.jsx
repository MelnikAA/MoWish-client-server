import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress1 from '../loading/CircularProgress'
import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result.googleId || user?.result?._id;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    dispatch(getPostsByCreator(id));
  }, []);

  if (!posts.length && !isLoading) return 'No posts';
  console.log(posts)
  return (
    <div>
  {user && user.result && posts[0] && (
  (user.result.googleId === posts[0].creator || user.result._id === posts[0].creator) ? (
    <div>
      
    </div>
  ) : (
    <div>
      <Typography style={{ marginTop: "100px" }} variant="h4">Имя автора: {posts[0].name}</Typography>
    </div>
  )
)}

  <Divider style={{ margin: '20px 0 50px 0' }} />
  {isLoading ? <CircularProgress1 /> : (
    <Grid container alignItems="stretch" spacing={3}>
      {
      posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  )}
</div>

  );
};

export default CreatorOrTag;
