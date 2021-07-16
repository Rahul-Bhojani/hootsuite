const mongoose = require('mongoose')

const dailySchema = new mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null
    },
    content: {
        type: String, required: true,
        minLength: 3,
        lowercase: true
    },
    hours: {
        type: Number, required: true,
    }
}, { timestamps: { updatedAt: false } })


const task = mongoose.model('DailyUpdate', dailySchema)

module.exports = task