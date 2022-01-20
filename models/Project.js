const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    requestor: String,
    qty: Number,
    charge: Number,
    paid: Boolean,
    due: Date,
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}], 
    photos: [{type: String}],
    status: String
    
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);
