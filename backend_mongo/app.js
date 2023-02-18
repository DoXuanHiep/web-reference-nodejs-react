const express = require("express")  //import express
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')    //import cors to fix error OPTIONS

//library of service upload file
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

//import routers
const feedRouters = require("./routes/feed");
const authRouters = require("./routes/auth")

const app = express()
app.use(cors({
    origin: '*',
    credentials: true }))

const fileStorge = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, `${uuidv4()}.jpeg`)    //file extensions .jpeg --- image
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.minitype === 'image/png' ||
//         file.minitype === 'image/jpg' ||
//         file.minitype === 'image/jpeg'
//     ) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }

// }

app.use(bodyParse.json())   //transform html -> json

app.use(multer({storage: fileStorge, }).single('image'))    //use multer to upload file

//get file static
app.use("/images", express.static(path.join(__dirname, 'images')));

//allow any client get, post,... CROS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


// use routes
app.use('/feed', feedRouters)
app.use('/auth', authRouters)
app.use('/', (req, res, next) => {
    res.status(200).json({status: "oke"})
})

// catch err
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode;
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

mongoose
    .connect('mongodb+srv://hiepdx23:soejR0bRoV52tgMh@cluster0.irsm5nb.mongodb.net/message?retryWrites=true&w=majority')
    .then(result => {
        const server = app.listen(8080)
        const io = require('./socket').init(server)
        io.on('connection', socket => {
            // console.log('Client connect')
        })
    })
    .catch (err => {
        console.log(err)
    })