const _ = require('lodash')
const { validChangePasswordSchema } = require('./schema/userValidSchema')

async function validChangePasswordReq(obj) {

    try {
        const value = await validChangePasswordSchema.validateAsync(obj)
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
    validChangePasswordReq
}