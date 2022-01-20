// Require dependencies

const express = require('express');
const projectsController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');


// ROUTES

// INDEX
projectsController.get('/', function (req, res){
    res.send('home page');
})


// NEW
projectsController.get('/projects/new', function (req, res){
    res.send('home page');
})


// DELETE
projectsController.delete('/projects/:id', async (req, res) => {
    try {
        res.json(await Project.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// UPDATE
projectsController.put('/projects/:id', async (req, res) => {
    try {
        res.json(
            await Project.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
        )
    } catch (error) {
        res.status(400).json(error);
    }
})


// CREATE

projectsController.post('/projects', async (req, res) => {
    try {
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

// EDIT


// SHOW


module.exports = projectsController;