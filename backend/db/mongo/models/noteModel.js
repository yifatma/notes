const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    header: { type: String },
})

const Notes = mongoose.model('Notes', noteSchema)

module.exports = Notes