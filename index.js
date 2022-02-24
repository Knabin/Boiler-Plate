const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 5000

dotenv.config()
const uri = process.env.MONGO_URI

console.log("URI: ", process.env.MONGO_URI)

const mongoose = require('mongoose')
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))