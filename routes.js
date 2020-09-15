const express = require('express');
const router = express.Router();
const bankController = require('./controllers/bankController');
const { check } = require('express-validator');

router.post('/banks', [
    check('name').not().isEmpty().withMessage('Bank name is not given'),
], bankController.register);

module.exports = router;