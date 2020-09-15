const mongoose = require("mongoose");
module.exports = mongoose.model('Kitten', new mongoose.Schema({
    name: String
}));