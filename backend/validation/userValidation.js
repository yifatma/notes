const _ = require('lodash')
const { validChangePasswordSchema, validateGetQuarySchem } = require('./schema/userValidSchema')

async function validChangePasswordReq(obj) {

    try {
        await validChangePasswordSchema.validateAsync(obj)
    } catch (err) {
        const error = _.chain(err)
            .pick(['message'])
            .set('status', 400)
            .set('code', 'REQ_VALIDATION_ERROR')
            .value()
        throw error
    }
}

async function validateGetQuary(obj) {
    try {
        await validateGetQuarySchem.validateAsync(obj)
    } catch (err) {
        const error = _.chain(err)
            .pick(['message'])
            .set('status', 400)
            .set('code', 'REQ_VALIDATION_ERROR')
            .value()
        throw error
    }
}

module.exports = {
    validChangePasswordReq,
    validateGetQuary
}