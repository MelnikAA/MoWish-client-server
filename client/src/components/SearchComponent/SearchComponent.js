import React, { useState, useParams, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    e.preventDefault();
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.kinopoisk.dev/movie?token=3GK894J-SAT4WBS-GG9WZYX-62WWSDD&search=${searchValue}&field=name&isStrict=false&sortField=votes.imdb&sortType=-1&sortField=rating.kp&sortType=-1`
      );
      const data = await response.json();

      setMovies(data.docs);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Router>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search movies..."
          />
          <button type="submit">Search</button>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
              </li>
            ))}
          </ul>
        )}

        <Switch>
          <Route path="/movies/:id">
            <MovieDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default SearchComponent;
