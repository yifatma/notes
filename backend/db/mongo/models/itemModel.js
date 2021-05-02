const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    noteId: { type: Schema.Types.ObjectId, required: true },
    item: String,
    isDone: Boolean,
    hasAttachment: Boolean
})

const Items = mongoose.model('Items', itemSchema)

module.exports = Items
