import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, InputBase, TextField } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import SearchIcon from "@material-ui/icons/Search";
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import logo from '../../images/logo.svg';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getPostsBySearch } from '../../actions/posts';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Navbar = ({ onFormHighlight }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userId = user?.result.googleId || user?.result?._id;
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const query = useQuery();
  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);


  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <AppBar maxWidth="lg" className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        
        <img className={classes.image} src={logo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
      
      <div className={classes.search}>
        
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
  placeholder="Найти список"
  classes={{
    root: classes.inputRoot,
    input: classes.inputInput
  }}
  inputProps={{ 'aria-label': 'search' }}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={handleKeyPress}
  
/>
          </div>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Typography className={classes.userName} >{user?.result.name}</Typography>
            </Button>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to={`/myprofile/${userId}`}>Профиль</MenuItem>
        <MenuItem component={Link} to={`/`} >Добавить список</MenuItem>
        <MenuItem onClick={logout} >Выйти</MenuItem>
      </Menu>
      </div>
            
            
          </div>
        ) : (
          <Button component={Link} className={classes.logout} to="/auth" variant="contained" color="primary">Войти</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
