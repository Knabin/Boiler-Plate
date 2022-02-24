const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const { User } = require('./models/User')

dotenv.config()
const uri = process.env.MONGO_URI

// client에서 오는 정보를 서버에서 분석해서 가져올 수 있게끔 설정한다.
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// application/json
app.use(bodyParser.json())

console.log("URI: ", process.env.MONGO_URI)

const mongoose = require('mongoose')
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 반갑습니다!'))

app.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어 준다.
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))