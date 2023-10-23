const express = require('express');
const app = express();
const Movie = require('./model');
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DatabaseMovie
app.post('/api/db/create', async (req, res) => {
  try {
    const { name, year, rate } = req.body;
    console.log(JSON.stringify(req.body))
    const newMovie = new Movie({
      movie_title: name,
      YearRL: year,
      Rate: rate,
    });

    await newMovie.save()
      .then(() => {
        res.json({ success: true, message: 'Movie added successfully' });
      })
      .catch(() => {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      })
      ;
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/db/update', (request, response) => {
  let form = request.body;
  let data = {
    movie_title: form.name || '',
    YearRL: form.year || 0,
    Rate: form.rate || ''

  };

  Movie.findByIdAndUpdate(form._id, data, { useFindAndModify: false })
    .then(updatedMovie => {
      console.log('Data updated');
      return Movie.find().exec();
    })
    .then(docs => {
      response.json(docs);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: err });
    });
});

app.post('/api/db/delete', (request, response) => {
  let _id = request.body._id;

  Movie.findByIdAndDelete(_id, { useFindAndModify: false })
    .then(deletedMovie => {
      console.log('Data deleted');
      return Movie.find().exec();
    })
    .then(docs => {
      response.json(docs);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: err });
    });
});

app.get('/api/db/read', async (req, res) => {
  try {
    const movies = await Movie.find({});
    console.log(JSON.stringify(movies));
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Session
const session = require('express-session');
app.use(session({ 
    secret: 'reactrestapi',
    resave: false,
    saveUninitialized: false
}));

app.get('/api/session/get', (request, response) => {
  let signedIn = request.session.email ? true : false;
  response.json({ signedIn });
})

app.post('/api/session/set', (request, response) => {
  let email = request.body.email || ''
  let password = request.body.pswd || ''
  if (password === '12345') {
    request.session.email = email
    response.json({ signedIn: true })
  } else {
    response.json({ signedIn: false })
  }
})

app.get('/api/session/del', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      } else {
        console.log('Session destroyed successfully.');
      }
      res.json({ signedIn: false });
    });
  } else {
    console.log('No session to destroy.');
    res.json({ signedIn: false });
  }
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
