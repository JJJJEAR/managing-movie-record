const express = require('express');
const app = express();
const PORT = 8000;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'movies',
});

db.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
      if (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/api/movies', (req, res) => {
    const { movie_title, YearRL, Rating } = req.body;
    db.query('INSERT INTO movies (movie_title, YearRL, Rating) VALUES (?, ?, ?)', [movie_title, YearRL, Rating], (err, result) => {
      if (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Movie added successfully', Id: result.insertId });
      }
    });
  });
  
  app.delete('/api/movies/:Id', (req, res) => {
    const movieId = req.params.Id;
    db.query('DELETE FROM movies WHERE Id = ?', [movieId], (err, result) => {
      if (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Movie deleted successfully' });
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });