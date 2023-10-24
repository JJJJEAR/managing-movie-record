const express = require('express');
const app = express();
const Movie = require('./model');
const User = require('./model2');
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcrypt');
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash())

app.use(session({
  secret: 'Movie-Test', 
  resave: false,
  saveUninitialized: true,
}));

//DatabaseLogin
app.post('/api/db/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log('Received data:', username, password, role);
    const existingUser = await User.findOne({ username });
    console.log(JSON.stringify(req.body))
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.json({ success: true, message: 'User registered successfully',redirectTo: '/login' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/db/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log(user)

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userId = user._id;
        res.json({ signedIn: true, message: 'Login successful', redirectTo: '/' });
      } else {
        res.status(401).json({ signedIn: false, error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ signedIn: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ signedIn: false, error: 'Internal Server Error' });
  }
});

app.get('/api/db/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
    } else {
      res.json({ signedIn:false , massage: 'Logout successful' });
    }
  });
});

app.get('/api/db/getUserRole', (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ role: 'null' }); 
    }

    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404).json({ role: 'null' }); 
        } else {
          res.json({ role: user.role }); 
        }
      })
      .catch(err => {
        console.error('Error fetching user role:', err);
        res.status(500).json({ role: 'null' }); 
      });
});

//DatabaseMovie
app.post('/api/db/create', async (req, res) => {
  try {
    const { name, year, Rate } = req.body;
    console.log(JSON.stringify(req.body))
    const newMovie = new Movie({
      movie_title:name,
      YearRL:year,
      Rate 
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
    Rate: form.rating 

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
