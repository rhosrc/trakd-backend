// Require dependencies

const express = require('express');
const projectsController = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

const Project = require('../models/Project');
// const Note = require('../models/note');
// const cloudinary = require('cloudinary').v2;



// authentication middleware

async function isAuthenticated(req, res, next) {
    try {
        const token = req.get('Authorization')
        if(!token) throw new Error('please log in');
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if(!user) throw new Error('something went wrong');
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// ROOT/HOME

projectsController.get('/', function (req, res) {
    res.send('hello world');
})

// INDEX
projectsController.get('/projects', isAuthenticated, async function (req, res) {
    try {
        res.json(await Project.find({ uId: req.user.uid }));
    } catch (error) {
        res.status(400).json(error);
    }
})


// DELETE
projectsController.delete('/projects/:id', isAuthenticated, async function (req, res) {
    try {
        res.json(await Project.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// UPDATE
projectsController.put('/projects/:id', isAuthenticated, async function (req, res)  {
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

projectsController.post('/projects', isAuthenticated, async function (req, res) {
    try {
        req.body.uId = req.user.uid;
        res.json(await Project.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})


// SHOW

projectsController.get('/projects/:id', isAuthenticated, async function (req, res) {
    try {
        res.json(await Project.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// Add note
projectsController.post('/projects/:id/notes', isAuthenticated, async function (req, res) {  
    try {
        const project = await Project.findById(req.params.id);
        project.notes.push(req.body);
        await project.save();
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete note
projectsController.delete('/notes/:id', isAuthenticated, async function (req, res) {
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