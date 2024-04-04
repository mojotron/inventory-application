const mongoose = require('mongoose');

const connectDB = (url) => {
  // returns promise
  return mongoose.connect(url);
};

module.exports = connectDB;
