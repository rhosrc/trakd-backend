// Require dependencies

const express = require('express');
const projectsController = express.Router();
const axios = require('axios');


const Project = require('../models/project');
// const Note = require('../models/note');
const cloudinary = require('cloudinary').v2;

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
    // console.log(req.files)
    try {
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})


// SHOW

projectsController.get('/projects/:id', async function (req, res) {
    try {
        res.json(await Project.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// Add note
projectsController.post('/projects/:id/notes', async function (req, res) {  
    try {
        const project = await Project.findById(req.params.id);
        project.notes.push(req.body);
        await project.save();
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete note
projectsController.delete('/notes/:id', async function (req, res) {
    try {
        const project = await Project.findOne({'notes._id': req.params.id });
        project.notes.pull(req.params.id);            
        res.json(await project.save());
    } catch (error) {
        res.status(400).json(error);
    }
    
})



// projectsController.delete('/projects/:id/notes/:noteId', async function (req, res) {
//     try {
    // { $pull : { 'notes': { 'note._id': req.params.noteId } } }
//         res.json(await Project.findByIdAndDelete(req.params.noteId));
//         console.log('hello')
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })




module.exports = projectsController;