const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')   

mongoose.connect('mongodb://0.0.0.0:27017/db1', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

let movieSchema = new mongoose.Schema({
  movie_title: String,
  YearRL: Number,
  Rate: {
    type: String,
    enum: ['G', 'PG', 'M', 'MA', 'R'],
    default: 'G' // ค่าเริ่มต้น
  }
})

movieSchema.plugin(paginate)	

let Movie = mongoose.model('Movie',movieSchema)
console.log('Movie model created')
module.exports = Movie 