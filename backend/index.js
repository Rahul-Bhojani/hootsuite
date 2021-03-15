const express = require('express');
const connectDb = require('./dataBase/mongoose')


const app = express();



// var cookieParser = require('cookie-parser')
const cors = require('cors')

connectDb()
app.use(express.json())
// app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(require('./routers/user'));




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})

