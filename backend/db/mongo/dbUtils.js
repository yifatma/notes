
const mongoose = require('mongoose')
const Todos = require('./models/todoModel')
const todoUtils = require('./utils/todoUtils')



module.exports = class DBUtils {

    async createDBConnection() {
        console.log(`Start createDBConnection`)

        console.log(`DB ${process.env.DB_CONNECTION}`)

        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`End Init Schema`)
        return 'SUCCESS'
    }
    async insertSeedData() {

        const starterTodo = [
            {
                username: 'test',
                todo: 'Milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Oil',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Banana',
                isDone: false,
                hasAttachment: false
            }
        ]

        const result = await Todos.create(starterTodo)
        console.log(`Data inserted: ${result}`)
        return result
    }

    getTodoUtils() { return todoUtils }
}
