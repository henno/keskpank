const express = require('express');
const router = express.Router();
const bankController = require('./controllers/bankController');
const { check, validationResult } = require('express-validator');
const {validateApiKey} = require("./middlewares");

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};

router.post('/banks', [
    check('name').not().isEmpty().withMessage('name is invalid'),
    check('transactionUrl').isURL().withMessage('transactionUrl is invalid'),
    check('owners').not().isEmpty().withMessage('owners is invalid'),
    check('jwksUrl').isURL().withMessage('jwksUrl is invalid'),
    validate
], bankController.register);

router.get('/banks', validateApiKey, bankController.getAll);

module.exports = router;