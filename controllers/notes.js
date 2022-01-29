const express = require('express');
const notesController = express.Router();
const axios = require('axios');

const Project = require('../models/Project');
const Note = require('../models/note');


notesController.post('/projects/:id/notes', async function (req, res) {
    try {
        const note = await Note.create({ content: req.body.newNote});
        // console.log(note);
        await note.save()
        // console.log(req.body.newNote);
    } catch (error) {
        res.status(400).json(error);
    }
})

notesController.get('/projects/:id/notes', async function (req, res) {
    try {
        res.json(await Note.findById({ content: req.body.newNote}));
        console.log(req.body.newNote);
    } catch (error) {
        res.status(400).json(error);
    }
})


// const addNote = async function (id) {    
//     Project.findByIdAndUpdate(result._id, 
//         {$push: {"notes": newNote.note}}
//     )
//     await Project.save();
// }

module.exports = notesController;