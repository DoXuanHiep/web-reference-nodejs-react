const express = require('express')

const router = express.Router();
const { check, body } = require('express-validator');
const User = require('../models/user')

const authController = require('../controllers/auth')

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(value => {
            return User.findOne({email: value})
                .then(user => {
                    if (user) {
                    return Promise.reject('E-mail does exist');
                }
            });
        }),
    check('password')
        .isLength({min: 5})
        .withMessage('Please enter password with only numbers and at least 5 charater')
        .isAlphanumeric()
        .withMessage('Please enter password with only numbers and at least 5 charater'),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.singup);

router.post('/login', authController.login);

module.exports = router;