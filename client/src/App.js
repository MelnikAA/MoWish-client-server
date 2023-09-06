import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import AddPost from './components/AddPost/AddPost';
import FilmInfo from './components/FilmInfo/FilmInfo'
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Profile from './components/Profile/Profile';
import Tag from './components/CreatorOrTag/Tag';
import SearchComponent from './components/SearchComponent/SearchComponent';
import Form from './components/Form/Form';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/post/edit/:id" component={AddPost} />
          <Route path="/addpost" exact component={Form} />
          <Route path="/film/:id" exact component={FilmInfo} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/films/:id" exact component={SearchComponent} />
          <Route path={'/myprofile/:id'} component={Profile} />
          <Route path={'/creators/:id'} component={CreatorOrTag} />
          <Route path={ '/tags/:id'} component={Tag} />
          
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
