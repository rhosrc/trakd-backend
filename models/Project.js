const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    uId: String,
    name: String,
    requestor: String,
    qty: Number,
    charge: Number,
    paid: String,
    due: Date,
    status: String,
    notes: [{ 
        content: String
    }],
    photos: [{type: String}]
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);
