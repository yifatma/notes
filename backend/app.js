const express = require('express')
const DBFactory = require('./db/dbFactory')
// const setupController = require('./controllers/setupController')
const itemController = require('./controllers/itemsController')
const userController = require('./controllers/usersController')
const noteController = require('./controllers/notesController')

const app = express()

const port = process.env.PORT || 3000

app.use('/assets', express.static(__dirname + '/public'))

// app.set('view engine', 'ejs')

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

// setupController(app)
// todoController(app)
userController(app)
noteController(app)
itemController(app)

const createDBConnection = new Promise(async (resolve, reject) => {
    const dbUtils = DBFactory.getDBUtils()
    await dbUtils.createDBConnection()
    resolve()
})

createDBConnection.then(async () => {
    console.log(`CreateDB Schema `)
    console.log(`Server is listen on port ${port}`)
    app.listen(port)
})
