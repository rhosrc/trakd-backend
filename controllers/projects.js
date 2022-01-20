// Require dependencies

const express = require('express');
const projectsController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');


// ROUTES

projectsController.get('/', function (req, res){
    res.send('home page');
})


// PEOPLE INDEX ROUTE - POST
projectsController.post('/projects', async (req, res) => {
    try {
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

projectsController.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

projectsController.put('/people/:id', async (req, res) => {
    try {
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
        )
    } catch (error) {
        res.status(400).json(error);
    }
})



module.exports = projectsController;