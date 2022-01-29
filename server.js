// REQUIRE DEPENDENCIES 
// import express

const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

// Controllers

const projectsController = require('./controllers/projects');


// initalize app
const app = express();


require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// pull PORT from .env

const {PORT = 3001, DATABASE_URL} = process.env;


const cors = require('cors');
const morgan = require('morgan');


// AUTH




// DATABASE CONNECT

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

// Connection Listeners

db.on('error', function (err){
    console.log(err.message + 'is mongo not running?');
});
db.on('connected', function () {
    console.log('mongo connected');
});
db.on('disconnected', function () {
    console.log('mongo disconnected');
});


// MIDDLEWARE

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(expressFileUpload({ createParentPath: true }))


// Mount routes

app.use('/', projectsController);
// app.use('/', notesController);


// LISTENER

app.listen(PORT, function () {
    console.log(`listening on PORT ${PORT}`);
});