const express = require('express');
const router = express.Router();
const bankController = require('./controllers/bankController');
const { check } = require('express-validator');

router.post('/banks', [
    check('name').not().isEmpty().withMessage('name is invalid'),
    check('transactionUrl').isURL().withMessage('transactionUrl is invalid'),
    check('owners').not().isEmpty().withMessage('owners is invalid'),
], bankController.register);
router.post('/transfer', [
    check('amount').not().isEmpty().withMessage('amount is required'),
    check('accountFrom').isString().withMessage('accountFrom is invalid'),
    check('accountTo').not().isEmpty().withMessage('accountTo is invalid'),
], bankController.transfer);
module.exports = router;