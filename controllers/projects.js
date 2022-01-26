// Require dependencies

const express = require('express');
const projectsController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const Note = require('../models/note');


// ROUTES

// ROOT/HOME



// INDEX
projectsController.get('/projects', async function (req, res) {
    try {
        res.json(await Project.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})


// DELETE
projectsController.delete('/projects/:id', async function (req, res) {
    try {
        res.json(await Project.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// UPDATE
projectsController.put('/projects/:id', async function (req, res)  {
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

projectsController.post('/projects', async function (req, res) {
    try {
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})


// SHOW

projectsController.get('/projects/:id', async function (req, res) {
    try {
        res.json(await Project.findById(req.params.id).populate('notes'));
    } catch (error) {
        res.status(400).json(error);
    }
})

// .populate('notes').exec(function (err, project) {
//     console.log('notes populated!');
// }


module.exports = projectsController;