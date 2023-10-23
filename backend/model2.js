const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/db1', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

let userSchema = new mongoose.Schema({
  username:String,
  password:String,
  role: {
    type: String,
    enum: ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF'],
    default: 'FLOORSTAFF',
  },
});

let User = mongoose.model('User', userSchema);

module.exports = User;