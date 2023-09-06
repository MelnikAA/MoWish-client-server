import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
const MovieDetails = () => {
    // Получение информации о фильме по ID из URL
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        setIsLoading(true);
  
        try {
          const response = await fetch(`https://api.kinopoisk.dev/v1.3/movie/${id}?token=3GK894J-SAT4WBS-GG9WZYX-62WWSDD`);
          const data = await response.json();
  
          setMovie(data);
        } catch (error) {
          console.error(error);
        }
  
        setIsLoading(false);
      };
  
      fetchMovieDetails();
    }, [id]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (!movie) {
      return <p>Movie not found</p>;
    }
  
    return (
      <div>
        <h2>{movie.name}</h2>
        <h3>{movie.year}</h3>
        <p>{movie.description}</p>
        
      </div>
    );
  };

  export default MovieDetails;