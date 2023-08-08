const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
