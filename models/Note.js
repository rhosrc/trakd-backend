const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    source: {type: Schema.Types.ObjectId, ref: 'Project'},
    content: String
}, {timestamps: true});

module.exports = mongoose.model('Note', noteSchema);