const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    old_password: Joi.ref('password'),

    new_password: Joi.ref('password')
})

const validChangePasswordSchema = Joi.object({
    id: Joi.objectId().required(),

    old_password: Joi.string().required(),
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    new_password: Joi.string().required()

    // new_password: Joi.required().valid(Joi.ref('old_password'))
})

module.exports = {
    userSchema,
    validChangePasswordSchema
}