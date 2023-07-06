//mongodb+srv://marina:SS0uiOo8qkJANgc2@marinacluster.nyhy8c8.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://marina:<password>@marinacluster.nyhy8c8.mongodb.net/


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/movie');

let app = express();

// ------------------ DB - start
const uri = "mongodb+srv://marina:SS0uiOo8qkJANgc2@marinacluster.nyhy8c8.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('connected to MongoDB');
    } catch (e) {
        console.log(e);
    }
}
connect();
// ------------------ DB - end


app.use(express.json()); // Add this line to parse JSON request bodies
app.use(cors());

app.get('/db-movies', async (req, res) => {
    const movies = await Movie.find({});
    res.send(movies);
});

// Endpoint to add a new movie
app.post('/add-movie', async (req, res) => {
    try {

        //const { title, image, rating } = req.body;
        const title = req.body.title;
        const image = req.body.image;
        const rating = req.body.rating;
        
        const newMovie = new Movie({
            title,
            image,
            rating,
        });

      const savedMovie = await newMovie.save();
      console.log('Movie saved:', savedMovie);
  
      res.status(201).json(savedMovie);
    } catch (error) {
      console.error('Error saving movie:', error);
      res.status(500).json({ error: 'Failed to save movie' });
    }
});  

// app.get('/movies', (req, res) => {
//     const movies = [
//         {id: 1, title: 'Twin Peaks'},
//         {id: 8, title: 'No Escape'}
//     ]
//     res.send(movies);
// });
app.listen(5000);