const express = require('express')

//validator libarary
const {body} = require('express-validator')

const feedController = require('../controllers/feed')

const router = express.Router();
const isAuth = require('../middlerware/is-auth')

router.get('/posts', feedController.getPosts)

router.post('/post', [
    //check validation
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], isAuth, feedController.createPost)

router.get('/posts/:postId', isAuth, feedController.getPost)

router.put('/posts/:postId', [
    //check validation
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], isAuth, feedController.updatePost)

router.delete('/posts/:postId', isAuth, feedController.deletePost)

module.exports = router