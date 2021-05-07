const _ = require('lodash')
const dbFactory = require('../db/dbFactory')
const userValidation = require('../validation/userValidation')
const passwordValidation = require('../validation/passwordValidation')

const dbUtils = dbFactory.getDBUtils()
const userUtils = dbUtils.getUserUtils()

async function updatePassword(req) {
    let hashedPassword
    if (req.body.password) {
        const salt = await bcrypt.genSalt()
        hashedPassword = await bcrypt.hash(req.body.password, salt)
    }

    return await updateUserData(req, hashedPassword)
}

async function updateUserData(req, hashedPassword) {
    const obj = await userUtils.getById(req.body.id)
    if (obj) {
        const user = await userUtils.findByIdAndUpdate(req, obj, hashedPassword)
        return user
    }

    throw new Error('USER_NOT_EXIST')
}


module.exports = function (app) {

    app.get('/api/users/:id', async function (req, res) {
        try {
            const user = await userUtils.getById(req.params.id)

            res.status(200).send(user)
        } catch (err) {
            const status = err.status ? err.status : 500
            res.status(status).send(err)
            throw err
        }
    })

    //Done
    app.get('/api/users', async function (req, res) {
        try {
            await userValidation.validateGetQuary(req.query)

            const user = await userUtils.getObj({ email: req.query.email })

            res.status(200).send(user)
        } catch (err) {
            const status = err.status ? err.status : 500
            res.status(status).send(err)
            throw err
        }
    })

    //Done
    app.patch('/api/users/password', async function (req, res) {

        try {
            await userValidation.validChangePasswordReq(req.body)

            const user = await userUtils.getById(req.body.id)

            await passwordValidation.comparePasswords(req.body.old_password, user.password)

            const hashedPassword = await passwordValidation.hashedPassword(req.body.new_password)

            res.status(200).send(await userUtils.findByIdAndUpdate(req.body.id, { "password": hashedPassword }))

        } catch (err) {
            const status = err.status ? err.status : 500
            res.status(status).send(err)
            throw err
        }

    })

    app.post('/api/users', async function (req, res) {

        try {
            if (!req.body.password)
                res.status(400).send(`New Object should contain password`)

            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const newUser = userUtils.initObject(req.body, hashedPassword)

            const user = await userUtils.create(newUser)
            res.status(201).send(`Success update user ${user}`)

            // if (req.body.id) {
            //     const obj = await updateRequest(req)

            //     if (obj) {
            //         res.status(201).send(`Success update user`)
            //         return
            //     }
            // }

            // const obj = await newRequest(req)
            // if (obj) {
            //     res.status(201).send(`Success - insert new user`)
            //     return
            // }

            // res.status(400).send(`Error - user wan't created`)
            // return

        } catch (err) {

            if (err && err.code === 11000) {
                res.status(400).send(`Email already exist`)
                return
            }

            res.status(500).send()
            throw err
        }
    })

    app.delete('/api/users', async function (req, res) {
        var id = req.body.id

        const todo = await userUtils.findByIdAndRemove(id)
        res.send(todo)
    })
}

