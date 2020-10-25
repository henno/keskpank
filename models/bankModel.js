const mongoose = require("mongoose");
const validateUrl = function (url) {
    var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
    return re.test(url)
};
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
        required: true,
        validate: validateUrl
    },
    bankPrefix: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3
    },
    owners: {
        type: String,
        required: true,
        minlength: 1
    },
    jwksUrl: {
        type: String,
        required: true,
        validate: validateUrl
    }
}));