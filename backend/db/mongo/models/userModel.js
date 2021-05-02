const mongoose = require('mongoose')
require('mongoose-type-email')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: mongoose.SchemaTypes.Email, required: true, index: { unique: true } },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, required: true }
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users