const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
