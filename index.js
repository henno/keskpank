const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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


const BankModel = require('./models/banks.js');

const myBank = new BankModel({name: 'Silence'});
console.log(myBank.name); // 'Silence'

myBank.save(function (err) {
    if (err) return console.error(err);
});

BankModel.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})

// Init configuration from .env file
dotenv.config();

// Parse request body as JSON
app.use(express.json());

// Return 'Hello World' on GET / request
app.get('/', function (req, res) {

    res.status(204).json({msg: 'Hello World'});
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})
