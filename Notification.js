const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({

    title: {
        type:String
    },
    message: {
        type: String
    },
    filePath: {
        type: String
    },
    date: {
        type: Date
    },
    venue: {
        type: String
    }

})


const Notification = mongoose.model('Notification', notificationSchema)

module.exports = {
    Notification
}