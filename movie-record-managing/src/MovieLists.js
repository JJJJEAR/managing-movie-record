import React from 'react';
import './css/MovieStyles.css';

export default function Movie() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/db/read')
      .then(response => response.json())
      .then(result => {
        setMovies(result);
      })
      .catch(err => {
        alert(err.message || 'An error occurred while fetching data.');
      });
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Movies List</h1>
      <div className="movieBoxes">
        {movies.map((movie, index) => (
          <div key={movie._id} className="movieBox">
            <div className="topBar">
              <span className="movieName">{movie.movie_title}</span>
              <span className="movieRating">Rating : {movie.Rate}</span>
            </div>
            <p>Movie Title : {movie.movie_title}</p>
            <p>Year Release : {movie.YearRL}, Rating of Movie : {movie.Rate}</p>
          </div>
        ))}
      </div>
      <p className="movieCount">Total Movies: {movies.length}</p>
    </div>
  );
}