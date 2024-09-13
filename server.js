const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

// Import your models and routes
const Form = require('./models/form'); // Ensure this path is correct
const formRoutes = require('./routes/formRoutes'); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000; // Use environment variable or default to 2000

// MongoDB connection
const mongoURI = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/TechincalAssement';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Express session setup
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// // Passport configuration
//  passport.use(.createStrategy()); // Ensure you have a Signup model configured
//   passport.serializeUser(Signup.serializeUser());
//  passport.deserializeUser(Signup.deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session())

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Use imported routes
app.use('/', formRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).send('Error! This page does not exist');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
