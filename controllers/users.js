// Require dependencies

const express = require('express');
const usersController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');


// ROUTES

usersController.get('/login', function (req, res){
    res.send('login here');
})

usersController.get('/signup', function (req, res){
    res.send('sign up here');
})

usersController.get('/logout', function (req, res){
    res.send('logout here');
})

usersController.get('/dashboard', function (req, res){
    res.send('dashboard is here');
})

usersController.post('/dashboard', function (req, res){
    res.send('login');
})


module.exports = usersController;