const {validationResult} = require('express-validator')
const fs = require('fs')    //fs to fix file    
const path = require('path')
const io = require('../socket')

// const Post = require('../models/post')
const Post= require('../models/post')
const User = require('../models/user')

exports.getPosts = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    try {
        const posts = await Post.findAndCountAll({
            include: User,
            limit: perPage,
            offset: (currentPage - 1) * perPage,
        })
        await res.status(200).json({
            message: 'Successed',
            posts: posts.rows,
            totalItems: posts.count
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    } 
}

exports.createPost = async (req, res, next) => {
    console.log(req.userId)
    const imageUrl = `${req.file.path.replace("\\" ,"/")}`; //replace \\ -> /
    const title = req.body.title
    const content = req.body.content
    const user = await User.findByPk(req.userId)

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        userId: user.id,
    })
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed')
            error.statusCode = 422;
            throw error
        }
        const result = await post.save()
        await io.getIO().emit('posts', {action: 'create', post: post})
        await res.status(201).json({
            message: 'Posts created successfully',
            post: result,
            creator: {_id: user.id, name: user.name}
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.getPost = async (req, res, next) => {
    const postId = req.params.postId
    
    const post = await Post.findByPk(postId, {
        include: User,
    })

    try {
        if (!post) {
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error
        }
        await res.status(200).json({
            message: 'successfully',
            post: post
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }

    // const postId = req.params.postId
    // Post.findById(postId)
    //     .then(result => {
    //         if (!result) {
    //             const error = new Error('Could not find');
    //             error.statusCode = 404;
    //             throw error
    //         }
    //         res.status(200).json({
    //             message: 'successfully',
    //             post: result
    //         })
    //     })
    //     .catch(err => {
    //         if (!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err)
    //     })
}

// exports.updatePost = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const error = new Error('Validation failed')
//         error.statusCode = 422;
//         throw error
//     }

//     const postId = req.params.postId
//     const title = req.body.title;
//     const content = req.body.content;
//     let imageUrl = req.body.image;
//     if (req.file) {
//         imageUrl = `${req.file.path.replace("\\" ,"/")}`; //replace \\ -> /
//     }
//     if(!imageUrl) {
//         const error = new Error('No image provied')
//         error.statusCode = 422;
//         throw error
//     }

//     Post.findById(postId)
//         .then(post => {
//             if (!post) {
//                 const error = new Error('Could not find');
//                 error.statusCode = 404;
//                 throw error
//             }
//             //delete old image if user add other image
//             if (post.creator.toString() !== req.userId) {
//                 const error = new Error('Not authorized')
//                 error.statusCode = 403
//                 throw error
//             }
//             if (imageUrl !== post.imageUrl) {
//                 clearImage(post.imageUrl)
//             }
//             post.title = title
//             post.content = content
//             post.imageUrl = imageUrl
//             return post.save()
//         })
//         .then(result => {
//             res.status(200).json({
//                 message: 'Post updated',
//                 post: result
//             })
//         })
//         .catch(err => {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err)
//         })
// }

// exports.deletePost = (req, res, next) => {
//     const postId = req.params.postId
//     Post.findByIdAndRemove(postId)
//         .then(post => {
//             if (!post) {
//                 const error = new Error('Could not find');
//                 error.statusCode = 404;
//                 throw error
//             }
//             if (post.creator.toString() !== req.userId) {
//                 const error = new Error('Not authorized')
//                 error.statusCode = 403
//                 throw error
//             }
//             clearImage(post.imageUrl)
//             return post;
//         })
//         .then(r => {
//             return User.findById(req.userId)
//         })
//         .then(user => {
//             user.posts.pull(postId)
//             return user.save()
//         })
//         .then(result => {
//             res.status(200).json({message: 'Deleted post.'})
//         })
//         .catch(err => {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err)
//         })
// }

// // function to delete image if user fix post
// const clearImage = filePath => {
//     filePath = path.join(__dirname, '..', filePath)
//     fs.unlink(filePath, err => {
//         console.log(err)
//     })
// }