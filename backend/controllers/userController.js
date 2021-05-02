const _ = require('lodash')
const dbFactory = require('../db/dbFactory')

const dbUtils = dbFactory.getDBUtils()
const userUtils = dbUtils.getUserUtils()

module.exports = function (app) {

    app.get('/api/user/:id', async function (req, res) {
        const user = await userUtils.getById(req.params.id)

        res.send(user)
    })

    app.post('/api/user', async function (req, res) {

        if (req.body.id) {
            const obj = await userUtils.getById(req.body.id)

            if (obj) {
                const user = await userUtils.findByIdAndUpdate(req, obj)
                res.send(`Success findByIdAndUpdate result [${user}]`)
                return
            }

        }

        const newUser = userUtils.initObject(req.body)

        try {
            const users = await userUtils.create(newUser)
            res.send(`Success findByIdAndUpdate result [${users}]`)
        } catch (err) {

            if (err && err.code === 11000) {
                res.send(`Email already exist`)
                return
            } else {
                res.send(`Error: ${err}`)
                throw err
            }

        }
    })

    app.delete('/api/user', async function (req, res) {
        var id = req.body.id

        const todo = await userUtils.findByIdAndRemove(id)
        res.send(todo)
    })
}

