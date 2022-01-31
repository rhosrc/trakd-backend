const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    uId: {
        type: String,
        default: 'U9tHc42HMpUswzqDF5uyRzmA32g2'
    },
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
    photos: String
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);
