import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Spoiler from '../FilmInfo/Spoiler'
import './style.css';
const MovieInfo = () => {
    const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
       
      try {
        const response = await fetch(`https://api.kinopoisk.dev/v1.3/movie/${id}?token=3GK894J-SAT4WBS-GG9WZYX-62WWSDD`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie information:', error);
      }
    };

    fetchMovieInfo();
  }, [id]);
  console.log(movie) 
  if (!movie) {
    return <div>Loading...</div>;
  }
  const genres = movie.genres.map(genre => genre.name);
  const genresString = genres.join(', ');

  const countries = movie.countries.map(countries => countries.name);
  const countriesString = countries.join(', ');

 
  
  const filteredDirectors = movie.persons
  .filter(person => person.profession === "режиссеры")
  .map(person => person.name);

const names = filteredDirectors.join(", ");
  

  return (
    <div className="container">
    <div className="wrapper">
      <div className="wrapper-col-1">
        <img src={movie.poster.url} alt="постер" />
      </div>

      <div className="wrapper-col-2">
        <h1 className="title">{movie.name}</h1>
        <h6 className="subtitle">{movie.alternativeName}</h6>
        <p className="description">{movie.description}</p>

        <Spoiler >
        <ul>
      {movie.watchability.items.map((item, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
          
              <img src={item.logo.url} alt={item.name}  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            
            {item.name}
          </a>
        </li>
      ))}
    </ul>
      </Spoiler>

       

        {movie.type === 'tv-series' ? (
        <h2>О сериале</h2>
      ) : (
        <h2>О фильме</h2>
      )}

        <ul className="params">
          <li><span className="text-muted">Год производства</span> {movie.year}</li>
          <li><span className="text-muted">Страна</span>{countriesString}</li>
          <li><span className="text-muted">Жанр</span> {genresString}</li>
          <li><span className="text-muted">Слоган</span> <span className="text-muted">«{movie.slogan}»</span></li>
          <li><span className="text-muted">Режиссер</span> {names}</li>
          <li><span className="text-muted">Время</span> <time className="text-muted">{movie.movieLength}мин. / {Math.floor(movie.movieLength/60)}:{movie.movieLength%60}</time></li>
        </ul>
      </div>

      <div className="wrapper-col-3">
        <span className="rathing-main">{movie.rating.imdb}</span>
        <span className="rathing-counts">{movie.votes.imdb}</span>
        <a href="#" className="rathing-details">459 рецензий</a>
      </div>
    </div>
  </div>
  );
};

export default MovieInfo;
