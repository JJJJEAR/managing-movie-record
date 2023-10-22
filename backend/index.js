const express = require('express');
const app = express();
const Movie = require('./model');
// const multer = require('multer');
const PORT = 8000;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/db/create',async (req, res) => {

  try {
    const { name, year, rate } = req.body;
    // const img = req.file.buffer;
    console.log(JSON.stringify(req.body))
    const newMovie = new Movie({
      movie_title: name,
      YearRL: year,
      Rate: rate,
    });
    // const { name, img ,year, rate } = req.body;
    
    // console.log(req)
    // const newMovie = new Movie({
    //   movie_title: name,
    //   picture: img,
    //   YearRL: year,
    //   Rate: rate
    // });

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
    picture: form.img.buffer,
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

app.get('/api/db/read', (request, response) => {
  Movie
    .find({})
    .exec()
    .then(docs => response.json(docs))
    .catch(err => console.log(err))
})

app.get('/api/db/paginate', (request, response) => {
  let options = {
    page: request.query.page || 1,
    limit: 2,
  };

  Movie.paginate({}, options)
    .then(result => {
      response.json(result);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: err });
    });
});

app.get('/api/db/search', (request, response) => {
  let q = request.query.q || '';
  let pattern = new RegExp(q, 'ig');
  let conditions = {
    $or: [
      { name: { $regex: pattern, $options: 'i' } },
      { detail: { $regex: pattern, $options: 'i' } }
    ]
  };

  let options = {
    page: request.query.page || 1,
    limit: 2,
  };

  Movie.paginate(conditions, options)
    .then(result => {
      response.json(result);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: err });
    });
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});