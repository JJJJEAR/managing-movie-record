const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/db1', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,

    },
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = User;