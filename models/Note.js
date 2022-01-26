const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Project'},
    title: String,
    content: Number,
    tags: [String]
}, {timestamps: true});

module.exports = mongoose.model('Note', noteSchema);