const express = require('express');
const notesController = express.Router();
const axios = require('axios');

const Project = require('../models/project');
const Note = require('../models/note');


notesController.post('/projects', async function (req, res) {
    try {
        res.json(await Note.create(req.body));
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