const express = require("express")
const dotenv = require('dotenv')
const routes = require('./routes.js')
const mongoose = require('mongoose')
const {RequestHeadersHaveCorrectContentType, RequestBodyIsValidJson} = require('./asserts')

// Init configuration from .env file
dotenv.config();

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function () {
    console.log('Pending connection to mongodb is now open');
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Initialize Express
const app = express();

// Middlewares
app.use(RequestHeadersHaveCorrectContentType);
app.use(express.json()); // Parse request body if's JSON
app.use(RequestBodyIsValidJson)
app.use(express.urlencoded({extended: true})); // Parse request body if's key=and&value=pairs
app.use('/', routes) // Load routes

// Run the app
app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})
