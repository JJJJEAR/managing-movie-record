const mongoose = require('mongoose')
 
mongoose.connect('mongodb://0.0.0.0:27017/db1', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

let movieSchema = new mongoose.Schema({
  movie_title: String,
  YearRL: Number,
  Rate: String
})


let Movie = mongoose.model('Movie',movieSchema)
console.log('Movie model created')
module.exports = Movie 