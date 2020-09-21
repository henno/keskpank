const express = require('express');
const router = express.Router();
const bankController = require('./controllers/bankController');
const { check } = require('express-validator');
const {validateApiKey} = require("./middlewares");

router.post('/banks', [
    check('name').not().isEmpty().withMessage('name is invalid'),
    check('transactionUrl').isURL().withMessage('transactionUrl is invalid'),
    check('owners').not().isEmpty().withMessage('owners is invalid'),
], bankController.register);

router.get('/banks', validateApiKey, bankController.getAll);

module.exports = router;