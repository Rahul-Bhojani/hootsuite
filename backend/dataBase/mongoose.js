const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/staff', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, () => {
            console.log("Connected to Database...")
        })
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDb