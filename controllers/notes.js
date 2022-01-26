const express = require('express');
const notesController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const Note = require('../models/note');


notesController.post('/projects/:id', async function (req, res) {
    try {
        res.json(await Note.create(req.body));
        await Project.save();
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