const mongoose = require("mongoose");
module.exports = mongoose.model('Bank', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    transactionUrl: {
        type: String,
        required: true
    },
}));