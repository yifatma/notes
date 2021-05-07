
const mongoose = require('mongoose')
const Todos = require('./models/itemModel')
const itemUtils = require('./utils/itemsUtils')
const userUtils = require('./utils/usersUtils')
const noteUtils = require('./utils/notesUtils')


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
    // async insertSeedData() {

    //     // const starterTodo = [
    //     //     {
    //     //         noteId: 'test',
    //     //         todo: 'Milk',
    //     //         isDone: false,
    //     //         hasAttachment: false
    //     //     },
    //     //     {
    //     //         noteId: 'test',
    //     //         todo: 'Oil',
    //     //         isDone: false,
    //     //         hasAttachment: false
    //     //     },
    //     //     {
    //     //         noteId: 'test',
    //     //         todo: 'Banana',
    //     //         isDone: false,
    //     //         hasAttachment: false
    //     //     }
    //     // ]

    //     const starterUser = [
    //         {
    //             email: 'yifatmay@yahoo.com',
    //             firstName: 'Yifat',
    //             lastName: 'Mayron',
    //             password: 'MMM'
    //         }]

    //     const result = await Todos.create(starterUser)
    //     console.log(`Data inserted: ${result}`)
    //     return result
    // }

    getItemUtils() { return itemUtils }
    getUserUtils() { return userUtils }
    getNoteUtils() { return noteUtils }

}
