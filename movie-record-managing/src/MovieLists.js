import React from 'react';

export default function MovieList() {  
    let [movies, setMovies] = React.useState('');

    React.useEffect(() => {
        fetch('/api/movies')
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(err => alert(err));
    }, );

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.Id}>
            {movie.movie_title} - Year: {movie.YearRL}, Rating: {movie.Rating}
          </li>
        ))}
      </ul> 
    </div>
  );
};

