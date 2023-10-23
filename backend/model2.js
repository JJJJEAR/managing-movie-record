const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://0.0.0.0:27017/db1', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

let userSchema = new mongoose.Schema({
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
    enum: ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF'],
    default: 'FLOORSTAFF',
  },
});

let User = mongoose.model('User', userSchema);

module.exports = User;