const {validationResult} = require('express-validator')
const fs = require('fs')    //fs to fix file    
const path = require('path')
const io = require('../socket')

const Post = require('../models/post')
const User= require('../models/user')

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
        .countDocuments()
        .then(count => {
            // count return entire documents in post database
            totalItems = count;
            return Post.find()
                .populate('creator')
                // skip the first "currentPage - 1) * perPage" documents specified  
                .skip((currentPage - 1) * perPage)   
                // get the number of documents to send request
                .limit(perPage)
        })
        .then(result => {
            res.status(200).json({
                message: 'Successed',
                posts: result,
                totalItems: totalItems
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })  
}

exports.createPost = (req, res, next) => {
    //if having error from check validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed')
        error.statusCode = 422;
        throw error
    }
    if(!req.file) {
        // console.log(req.file.path)
        const error = new Error('No image provied')
        error.statusCode = 422;
        throw error
    }
    const imageUrl = `${req.file.path.replace("\\" ,"/")}`; //replace \\ -> /
    const title = req.body.title
    const content = req.body.content
    let creator;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId
    })
    post.save()
        .then(result => {
            return User.findById(req.userId)
        })
        .then(user => {

            creator = user
            user.posts.push(post)
            return user.save()
        })
        .then(result => {
            io.getIO().emit('posts', {action: 'create', post: post})
            res.status(201).json({
                message: 'Posts created successfully',
                post: result,
                creator: {_id: creator._id, name: creator.name}
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId)
        .populate('creator')
        .then(result => {
            if (!result) {
                const error = new Error('Could not find');
                error.statusCode = 404;
                throw error
            }
            res.status(200).json({
                message: 'successfully',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.updatePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed')
        error.statusCode = 422;
        throw error
    }

    const postId = req.params.postId
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = `${req.file.path.replace("\\" ,"/")}`; //replace \\ -> /
    }
    if(!imageUrl) {
        const error = new Error('No image provied')
        error.statusCode = 422;
        throw error
    }

    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find');
                error.statusCode = 404;
                throw error
            }
            //delete old image if user add other image
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not authorized')
                error.statusCode = 403
                throw error
            }
            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl)
            }
            post.title = title
            post.content = content
            post.imageUrl = imageUrl
            return post.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Post updated',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId
    Post.findByIdAndRemove(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find');
                error.statusCode = 404;
                throw error
            }
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not authorized')
                error.statusCode = 403
                throw error
            }
            clearImage(post.imageUrl)
            return post;
        })
        .then(r => {
            return User.findById(req.userId)
        })
        .then(user => {
            user.posts.pull(postId)
            return user.save()
        })
        .then(result => {
            res.status(200).json({message: 'Deleted post.'})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

// function to delete image if user fix post
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => {
        console.log(err)
    })
}