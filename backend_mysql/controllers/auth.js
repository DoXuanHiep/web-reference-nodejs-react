const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');     //encode feature
const jwt = require('jsonwebtoken')

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array()
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        })
        const result = await user.save()
        await res.status(201).json({message: 'User created!', userId: result.id})
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: { email: email } })
    try {
        if (!user) {
            const error = new Error('A user with this email could not be found.')
            error.statusCode = 401;
            throw error
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) {
            const error = new Error('Wrong password');
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
            email: user.email,
            userId: user.id.toString()
        }, 'somesupersecretsecret', { expiresIn: '1h' })

        res.status(200).json({token: token, userId: user.id.toString()})
    } catch(err) {
        console.log(1)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
    // User.findOne({email: email})
    //     .then(user => {
    //         if (!user) {
    //             const error = new Error('A user with this email could not be found.')
    //             error.statusCode = 401;
    //             throw error
    //         }
    //         loadedUser = user
    //         return bcrypt.compare(password, user.password)
    //     })
    //     .then(isEqual => {
    //         if (!isEqual) {
    //             const error = new Error('Wrong password');
    //             error.statusCode = 401
    //             throw error
    //         }
    //         const token = jwt.sign({
    //             email: loadedUser.email,
    //             userId: loadedUser._id.toString()
    //         }, 'somesupersecretsecret', { expiresIn: '1h' })

    //         res.status(200).json({token: token, userId: loadedUser._id.toString()})
    //     })
    //     .catch(err => {
    //         if(!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //     })
}