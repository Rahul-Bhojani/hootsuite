const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true,
        trim: true, minLength: 3,
        unique: true, lowercase: true
    },

    email: {
        type: String,
        required: true, trim: true,
        unique: true, lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        lowercase: true

    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        lowercase: true

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    mobileno: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        default: null
    },
    officeno: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        default: null
    },
    designation: {
        type: String,
        minLength: 2,
        lowercase: true,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    birthdate: {
        type: Date,
        default: null
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null
    },
    role: {
        type: Number,
        default: 3
    }

}, { timestamps: { updatedAt: false } })


const User = mongoose.model('User', userSchema)

module.exports = User

