const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    duration: {
        type: Number, required: true,
    }

}, { timestamps: { updatedAt: true } })


const task = mongoose.model('Task', taskSchema)

module.exports = task