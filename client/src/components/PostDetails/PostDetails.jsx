import React, { useEffect } from 'react';
import { Paper, Typography, Divider, Grid, CardActions, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { useParams, useHistory, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';
import CircularProgress1 from '../loading/CircularProgress'

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress1 size="7em" />
      </Paper>
    );
  }
  console.log(post)  
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.cardMain}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          
          
          <Typography variant="h6">
            Автор:
            <Link to={`/creators/${post.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <div>
      <h3>Фильмы:</h3>
      {post.films.length === 0 ? (
        <p>Фильмы не найдены</p>
      ) : (
        <Grid container alignItems="stretch" spacing={3} > 
        
          {post.films.map((film) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Card key={film._id} className={classes.card} sx={{ maxWidth: 345 }}>
              <CardMedia
                //sx={{ height: '100%' }}
                className={classes.filmImage}
                image={film.poster && film.poster.url ? film.poster.url : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                
              />
              <CardContent>
                <Typography variant="h5" component="div" className={classes.filmName}>
                  {film.name} 
                </Typography>
                <Typography variant="h1" component="div" className={classes.filmName}>
                  {film.year} 
                </Typography>
                <Typography variant="body2" color="text.secondary" className={classes.filmDescription}>
  { film.description && <Typography variant="body2" color="textSecondary" component="p">{film.description.split(' ').splice(0, 20).join(' ')}...</Typography>}
</Typography>

              </CardContent>
              <CardActions>
                
                <Button size="small">
                <Link to={`/film/${film.id}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` Подробнее`}
            </Link></Button>
              </CardActions>
            </Card>
            </Grid>
          ))}
        
        </Grid>
      )}
    </div>
          
          <Divider style={{ margin: '20px 0' }} />
          
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">Вам так же может понравиться:</Typography>
          <Divider />
          
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
