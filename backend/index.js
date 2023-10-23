const express = require('express');
const app = express();
const Movie = require('./model');
const User = require('./model2');
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash())

//DatabaseLogin
const expressSession = require('express-session')
const bcrypt = require('bcrypt');
const flash = require('connect-flash')

app.post('/api/db/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
   
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username:String,
      password: hashedPassword,
      role:String
    });

    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/db/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


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



app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
