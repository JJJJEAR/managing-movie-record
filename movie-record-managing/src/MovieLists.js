import React from 'react';

export default function Movie() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/db/read')
      .then(response => response.json())
      .then(result => {
        setMovies(result);
      })
      .catch(err => {
        setError(err.message || 'An error occurred while fetching data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.movie_title} - Year: {movie.YearRL}, Rating: {movie.Rate}
          </li>
        ))}
      </ul>
    </div>
  );
}