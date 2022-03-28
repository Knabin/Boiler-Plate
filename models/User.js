const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// sava 하기 전, function을 실행함
userSchema.pre('save', function(next){
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호를 암호화한다.
        // salt를 이용해서 비밀번호를 암호화하며, 이 salt를 생성해야 한다.
        // saltRounds는 salt가 몇 글자인지를 나타낸다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        // 비밀번호가 아니라 다른 정보를 변경한다면 넘겨 준다.
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }