//mongodb+srv://marina:SS0uiOo8qkJANgc2@marinacluster.nyhy8c8.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://marina:<password>@marinacluster.nyhy8c8.mongodb.net/


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/movie');
const Book = require('./models/book');
const Order = require('./models/order');
const OrderProduct = require('./models/redux-order-product');
const User = require('./models/authMovieDatabase');
const { sign, verify } = require('jsonwebtoken');

let app = express();

const KEY = 'suomalainen';

function createJSONToken(username) {
  return sign({ username }, KEY, { expiresIn: '1h' });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}


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

// const books = [
    
//         {
//           id: 'b4',
//           name: 'Book4',
//           description: 'If you want to learn how to cook, you definately should buy it!',
//           price: 28,
//         },
//       ];
//  for ( let book of books){

// // Create new book
// const newBook = new Book({
//   name: book.name,
//   description: book.description,
//   price: book.price
// });

// // Save a book in DB

// newBook.save()
//   .then((savedBook) => {
//     console.log( savedBook);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//  }

app.get('/books', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});

// Add new Customer/Order
app.post('/add-order', async (req, res) => {
    try {
        
        //const { title, image, rating } = req.body;
        const name = req.body.name;
        const street = req.body.street;
        const postalCode = req.body.postalCode;
        const city = req.body.city;
        
        console.log(req.body.orderedItems)
        const newOrder = new Order({
            name,
            street,
            postalCode,
            city
        });

      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error });
    }
});  


// OrderProduct

app.get('/product', async (req, res) => {
    const products = await OrderProduct.find({});
    res.send(products);
});

// Add new Order
app.put('/product', async (req, res) => {
    try {
        console.log('/product');
        //const { title, image, rating } = req.body;
        const title = req.body.title;
        const price = req.body.price;
        const amount = req.body.amount;
        const totalPrice = req.body.totalPrice;
        
        console.log(req.body)
        const newOrder = new OrderProduct({
            title,
            price,
            amount,
            totalPrice
        });

      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error });
    }
}); 

// ---Add authentication Movie DB---

let bcrypt = require('bcryptjs');

app.post('/signup', async (req, res) => {
    try {
        const username = req.body.login;
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const users = await User.find({});
        for (let i = 0; i < users.length; i++){
            console.log(username, users[i].username )
            if (username == users[i].username){
                return res.status(401).json({ message: 'The Username exists.' });
            }
        }

        // const user = await User.findOne({ username });
        // if (user) {
        //     return res.status(401).json({ message: 'The Username already exists.' });
        //   } 

        const newUser = new User({
        username,
        password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = createJSONToken(username);
        
      res.status(201).json({savedUser,token});
    } catch (error) {
      console.error('Error saving User:', error);
      res.status(500).json({ error: 'Failed to save user' });
    }
});  

app.post('/login', async (req, res) => {
    try {
        const username = req.body.login;
        const password = req.body.password;

        const user = await User.findOne({ username })
        if (!user){
            return res.status(401).json({ message: 'The Username is not found.' });
            } 
        const passwordMatch = await bcrypt.compare(password, user.password);


        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }
        const token = createJSONToken(username);
        console.log(token);

        res.status(200).json({ message: 'Successful login.', token:token});
  
    } catch (error) {
      console.error('Error login:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
});  


app.listen(5000);