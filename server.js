// REQUIRE DEPENDENCIES 

require('dotenv').config();

// pull PORT from .env

const {PORT = 3001, DATABASE_URL} = process.env;

// import express

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const projectsController = require('./controllers/projects');
const notesController = require('./controllers/notes');

const cors = require('cors');
const morgan = require('morgan');


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


// Mount routes

app.use('/', projectsController);
app.use('/', notesController);


// LISTENER

app.listen(PORT, function () {
    console.log(`listening on PORT ${PORT}`);
});