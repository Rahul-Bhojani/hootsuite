const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    taskname: {
        type: String, required: true,
        minLength: 3,
        lowercase: true
    },
    description: {
        type: String, required: true,
        minLength: 3,
        lowercase: true
    },
    technology: {
        type: String,
        minLength: 3,
        lowercase: true
    },
    duration: {
        type: String, required: true,
    }

}, { timestamps: { updatedAt: true } })


const task = mongoose.model('Task', taskSchema)

module.exports = task