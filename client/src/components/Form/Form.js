import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import SearchComponent from '../SearchComponent/SearchComponent';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import MyComponent from '../SearchComponent/MyComponent';
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', films:[], tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const [searchValue, setSearchValue] = useState('');
  const [films, setFilms] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
 console.log(currentId)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', films:[], tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      console.log(postData)
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      console.log("postData", postData)
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Пожалуйста, войдите, чтобы создать список.
        </Typography>
      </Paper>
    );
  }


  const handleSearch = async (value) => {
    setSearchValue(value);
    try {
      const response = await fetch(`https://api.kinopoisk.dev/movie?token=3GK894J-SAT4WBS-GG9WZYX-62WWSDD&search=${value}&field=name&isStrict=false&sortField=votes.imdb&sortType=-1&sortField=rating.kp&sortType=-1`);
      const data = await response.json();
      setFilms(data.docs);
      console.log(films)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };



  return (
    <Paper className={classes.paper} elevation={6}>
      
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        
        <Typography variant="h6">{currentId ? `Редактирование "${post?.title}"` : 'Создайте список'}</Typography>
        <TextField name="Title" variant="outlined" label="Название" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="Message" variant="outlined" label="Описание" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <Autocomplete 
            fullWidth
            
            multiple
            value={postData.films}
            options={films}
            getOptionLabel={(option) => option.name }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Найдите фильмы"
                
                variant="outlined"
              />
            )}
            onInputChange={(event, value) => handleSearch(value)}
            onChange={(event, value) => {
              const selectedFilms = value.map((film) => {
                return {
                  name: film.name,
                  year: film.year,
                  description: film.description,
                  poster: film.poster,
                  shortDescription: film.shortDescription,
                  id: film.id,
                  type: film.type
                };
              });

              // Обновляем состояние postData, передавая только выбранные фильмы
              setPostData({ ...postData, films: selectedFilms });
            }}
            renderOption={(option) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {option.poster && option.poster.previewUrl && (
                  <img src={option.poster.previewUrl} alt={option.name} style={{ width: "50px", marginRight: "10px" }} />
                )}
                <div>
                  <span style={{ fontWeight: "bold" }}>{option.name}</span>
                  <br />
                  <span>{option.year}</span>
                </div>
              </div>
            )}
  ignoreCase={true} // Игнорировать проверку на соответствие регистра
/>

        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Теги"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
      
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Сохранить</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Очистить</Button>
      </form>
    </Paper>
  );
};

export default Form;